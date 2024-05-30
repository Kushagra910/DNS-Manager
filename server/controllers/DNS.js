const DNS = require('../models/dns'); // Adjust the path as necessary
const {
  createHostedZoneAndRecord,
  updateRoute53Record,
  deleteRoute53Record,
  createRoute53BulkRecord,
  getHostedZonesAndRecords
} = require("../services/awsRoute53");

exports.createRecord = async (req, res) => {
  const { hostedZoneData, record } = req.body;

  try {
    const awsResponse = await createHostedZoneAndRecord(hostedZoneData, record);

    const newRecord = new DNS({
      domain: record.domain,
      type: record.type,
      ttl: parseInt(record.ttl),
      value: record.value,
      priority: record.priority,  // Handle MX record priority
      // Add other fields if necessary
    });
    await newRecord.save();

    res.status(201).json({ message: "success", data: newRecord, awsResponse });
  } catch (error) {
    res.status(500).json({ message: "error", data: error.message });
  }
};

exports.createBulkRecords = async (req, res) => {
  const { records } = req.body;

  try {
    const awsResponse = await createRoute53BulkRecord(records);
    console.log("AWS bulk Response", awsResponse);

      // Prepare the records for the database insertion
        const newRecords = records.map((record) => ({
          domain: record.domain,
          type: record.type,
          ttl: parseInt(record.ttl),
          value: record.value,
          priority: record.priority,  // Handle MX record priority
          // Add other fields if necessary
        }));

          // Insert the new records into the database
        const insertedRecords = await DNS.insertMany(newRecords);
    res.status(201).json({ message: "Bulk records creation successful", data: insertedRecords, awsResponse });
  } catch (error) {
    res.status(500).json({ message: "error", data: error.message });
  }
};


exports.getRecords = async (req, res) => {
  try {
    const dnsRecords = await DNS.find();

    res.status(200).json({ message: "Records fetched successfully", data: dnsRecords });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  const { recordId } = req.params;
  const { record } = req.body;

  try {
    const awsResponse = await updateRoute53Record(record);
    console.log("awsResponse", awsResponse);

    const updatedRecord = await DNS.findByIdAndUpdate(
      recordId,
      {
        domain: record.domain,
        type: record.type,
        ttl: parseInt(record.ttl),
        value: record.value,
        priority: record.priority,  // Handle MX record priority
        // Add other fields if necessary
      },
      { new: true }
    );

    console.log("updatedRecord", updatedRecord);

    res.status(200).json({ message: "Record updated successfully", data: updatedRecord, awsResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllHostedZones = async(req,res) => {
    try {
      const awsResponse = await getHostedZonesAndRecords();
      res.status(200).json({ message: "HostedZones & Records fetched successfully", data: awsResponse });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.deleteRecord = async (req, res) => {
    const { recordId } = req.params;
  
    try {
      const record = await DNS.findById(recordId);
      console.log("RECORD details", record);
  
      if (!record) {
        return res.status(404).json({ message: "Record not found" });
      }
  
      // Delete from Route 53
      const awsResponse = await deleteRoute53Record({
        domain: record.domain,
        type: record.type,
        ttl: record.ttl,
        value: record.value,
        priority: record.priority,  // Handle MX record priority
        // Add other fields if necessary
      });
  
      // Delete from MongoDB
      await DNS.findByIdAndDelete(recordId);
      console.log("RECORD deleted");
      return res.status(200).json({ success: true, message: "Record deleted successfully", awsResponse });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };