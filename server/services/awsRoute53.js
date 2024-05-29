require("dotenv").config();

const {
  Route53Client,
  ChangeResourceRecordSetsCommand,
  CreateHostedZoneCommand,
  ListHostedZonesByNameCommand,
  ListHostedZonesCommand,
  ListResourceRecordSetsCommand
} = require("@aws-sdk/client-route-53");

const client = new Route53Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

exports.prepareRecord = (record) => {
  let resourceRecords;
  let recordName = `${record.domain}`;

  if (record.type === "MX") {
    resourceRecords = [{ Value: `${record.priority} ${record.value}` }];
  } else if (record.type === "SRV") {
    resourceRecords = [
      {
        Value: `${record.priority} ${record.weight} ${record.port} ${record.target}`,
      },
    ];
  } else if (record.type === "DS") {
    resourceRecords = [
      {
        Value: `${record.keyTag} ${record.algorithm} ${record.digestType} ${record.digest}`,
      },
    ];
  } else if (record.type === "PTR" || record.type === "NS") {
    recordName = record.value;
    resourceRecords = [{ Value: record.value }];
  } else if (record.type === "TXT") {
    resourceRecords = [{ Value: `"${record.value}"` }];
  } else {
    resourceRecords = [{ Value: record.value }];
  }

  return { resourceRecords, recordName };
};

exports.createRoute53Record = async (recordParams) => {
  const { resourceRecords, recordName } = this.prepareRecord(recordParams);

  const params = {
    HostedZoneId: recordParams.HostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: recordName,
            Type: recordParams.type,
            TTL: parseInt(recordParams.ttl),
            ResourceRecords: resourceRecords,
          },
        },
      ],
    },
  };

  const command = new ChangeResourceRecordSetsCommand(params);
  return await this.client.send(command);
};

exports.deleteRoute53Record = async (record) => {
  const { resourceRecords, recordName } = this.prepareRecord(record);

  // console.log("RECORD_NAME",recordName);
  const hostedZoneId = await this.getHostedZoneId(recordName, 10);

  const params = {
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: "DELETE",
          ResourceRecordSet: {
            Name: recordName,
            Type: record.type,
            TTL: parseInt(record.ttl),
            ResourceRecords: resourceRecords,
          },
        },
      ],
    },
  };

  const command = new ChangeResourceRecordSetsCommand(params);
  return await this.client.send(command);
};



exports.updateRoute53Record = async (record) => {
  const { resourceRecords, recordName } = this.prepareRecord(record);

  const hostedZoneId = await this.getHostedZoneId(recordName, 1);
  console.log("HOSTEDZONEId" , hostedZoneId);
  const params = {
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: "UPSERT",
          ResourceRecordSet: {
            Name: recordName,
            Type: record.type,
            TTL: parseInt(record.ttl),
            ResourceRecords: resourceRecords,
          },
        },
      ],
    },
  };

  const command = new ChangeResourceRecordSetsCommand(params);
  return await this.client.send(command);
};

exports.createRoute53BulkRecord = async (records) => {
  const changes = records.map((record) => {
    const { resourceRecords, recordName } = this.prepareRecord(record);

    return {
      Action: "CREATE",
      ResourceRecordSet: {
        Name: recordName,
        Type: record.type,
        TTL: parseInt(record.ttl),
        ResourceRecords: resourceRecords,
      },
    };
  });

  const params = {
    HostedZoneId: process.env.HOSTED_ZONE_ID,
    ChangeBatch: {
      Changes: changes,
    },
  };

  const command = new ChangeResourceRecordSetsCommand(params);
  return await this.client.send(command);
};

exports.getHostedZoneId = async (dnsName, maxItems = 10) => {
  // Extract the root domain if it's a subdomain
  const parts = dnsName.split('.');
  const rootDomain = parts.slice(-2).join('.');
  
  const params = {
    DNSName: rootDomain,
    MaxItems: maxItems,
  };

  try {
    const command = new ListHostedZonesByNameCommand(params);
    const response = await this.client.send(command);
    console.log("COMMAND", command);
    console.log("RESPONSE", response);

    if (response.HostedZones.length > 0) {
      console.log("Hosted Zones:", response.HostedZones.map(zone => zone.Name));
    }

    if (
      response.HostedZones.length > 0 &&
      response.HostedZones[0].Name === `${rootDomain}.`
    ) {
      return response.HostedZones[0].Id.split("/").pop();
    } else {
      throw new Error(`No hosted zone found with the DNS name: ${rootDomain}`);
    }
  } catch (error) {
    console.error(error);
    throw error;  // Ensure the error is thrown after logging it
  }
};

exports.createHostedZone = async (hostedZoneData) => {
  const {
    name,
    // vpcId,
    // vpcRegion,
    // callerReference,
    delegationSetId,
  } = hostedZoneData;

  const params = {
    Name: name,
    // VPC: {
    //   VPCRegion: vpcRegion,
    //   VPCId: vpcId,
    // },
    CallerReference: new Date().getTime().toString(),
    DelegationSetId: delegationSetId,
  };
  const command = new CreateHostedZoneCommand(params);
  
  const response = await this.client.send(command);
  // console.log(`HostedZoneId: ${response.HostedZone.Id.split("/").pop()}`);
  return response;
};

exports.createHostedZoneAndRecord = async (hostedZoneData, recordData) => {
  const hostedZone = await this.createHostedZone(hostedZoneData);
  const hostedZoneId = hostedZone.HostedZone.Id.split("/").pop();

  const recordParams = {
    ...recordData,
    HostedZoneId: hostedZoneId,
  };

  return await this.createRoute53Record(recordParams);
};

// Function to get all hosted zones and their records
exports.getHostedZonesAndRecords = async () => {
  try {
    // Get all hosted zones
    const hostedZonesResponse = await client.send(new ListHostedZonesCommand({}));
    const hostedZones = hostedZonesResponse.HostedZones;

    const hostedZonesCount = hostedZones.length;

    // Fetch all records for each hosted zone
    const recordsPromises = hostedZones.map(async (zone) => {
      const recordsResponse = await client.send(new ListResourceRecordSetsCommand({
        HostedZoneId: zone.Id
      }));
      return {
        hostedZone: zone,
        records: recordsResponse.ResourceRecordSets
      };
    });

    const hostedZonesWithRecords = await Promise.all(recordsPromises);

    const totalRecordsCount = hostedZonesWithRecords.reduce((acc, zone) => {
      return acc + zone.records.length;
    }, 0);

    return {
      hostedZonesCount,
      totalRecordsCount,
      hostedZonesWithRecords
    };
  } catch (error) {
    console.error("Error fetching hosted zones and records:", error);
    throw error;
  }
};