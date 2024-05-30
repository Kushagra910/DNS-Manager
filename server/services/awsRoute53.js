const { 
  ChangeResourceRecordSetsCommand,
  CreateHostedZoneCommand,
  ListHostedZonesByNameCommand,
  ListHostedZonesCommand,
  ListResourceRecordSetsCommand 
} = require("@aws-sdk/client-route-53");
const client = require('./awsClient');

const prepareRecord = (record) => {
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

const deleteRoute53Record = async (record) => {
  console.log("INSIDE DELETE_ROUTE53",record);
  const { resourceRecords, recordName } = prepareRecord(record);
  const hostedZoneId = await getHostedZoneId(recordName, 10);
  console.log("HOSTEDZONEID",hostedZoneId);
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
  console.log("DELETE COMMAND", command);
  return await client.send(command);
};

const updateRoute53Record = async (record) => {
  const { resourceRecords, recordName } = prepareRecord(record);
  const hostedZoneId = await getHostedZoneId(recordName, 1);

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
  return await client.send(command);
};

const getHostedZoneId = async (dnsName, maxItems = 10) => {
  const parts = dnsName.split('.');
  const rootDomain = parts.slice(-2).join('.');

  const params = {
    DNSName: rootDomain,
    MaxItems: maxItems,
  };

  try {
    const command = new ListHostedZonesByNameCommand(params);
    const response = await client.send(command);

    if (response.HostedZones.length > 0 && response.HostedZones[0].Name === `${rootDomain}.`) {
      return response.HostedZones[0].Id.split("/").pop();
    } else {
      throw new Error(`No hosted zone found with the DNS name: ${rootDomain}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createRoute53Record = async (recordParams) => {
  const { resourceRecords, recordName } = prepareRecord(recordParams);

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
  return await client.send(command);
};

const createRoute53BulkRecord = async (records) => {
  const changes = records.map((record) => {
    const { resourceRecords, recordName } = prepareRecord(record);

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
  return await client.send(command);
};

const createHostedZone = async (hostedZoneData) => {
  const { name, delegationSetId } = hostedZoneData;

  const params = {
    Name: name,
    CallerReference: new Date().getTime().toString(),
    DelegationSetId: delegationSetId,
  };
  const command = new CreateHostedZoneCommand(params);

  const response = await client.send(command);
  return response;
};

const createHostedZoneAndRecord = async (hostedZoneData, recordData) => {
  const hostedZone = await createHostedZone(hostedZoneData);
  const hostedZoneId = hostedZone.HostedZone.Id.split("/").pop();

  const recordParams = {
    ...recordData,
    HostedZoneId: hostedZoneId,
  };

  return await createRoute53Record(recordParams);
};

const getHostedZonesAndRecords = async () => {
  try {
    const hostedZonesResponse = await client.send(new ListHostedZonesCommand({}));
    const hostedZones = hostedZonesResponse.HostedZones;

    const hostedZonesCount = hostedZones.length;

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

module.exports = {
  prepareRecord,
  deleteRoute53Record,
  updateRoute53Record,
  createRoute53Record,
  createRoute53BulkRecord,
  getHostedZoneId,
  createHostedZone,
  createHostedZoneAndRecord,
  getHostedZonesAndRecords
};
