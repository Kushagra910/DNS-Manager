import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBulkRecord,
  createRecord,
  updateRecord,
} from "../../services/operations/recordsApi";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [recordToUpdate, setRecordToUpdate] = useState("");
  const [updateData, setUpdateData] = useState("");
  const [bulkRecordsInput, setBulkRecordsInput] = useState("");
  const [hostedZoneName, setHostedZoneName] = useState("");
  const [recordDomain, setRecordDomain] = useState("");
  const [recordType, setRecordType] = useState("");
  const [recordTTL, setRecordTTL] = useState("");
  const [recordValue, setRecordValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const record = JSON.parse(updateData);
    dispatch(updateRecord(record, recordToUpdate, token));
  };

  const handleBulkCreate = async () => {
    try {
      const bulkRecords = JSON.parse(bulkRecordsInput);
      dispatch(createBulkRecord(bulkRecords.records, token,navigate));
    } catch (err) {
      console.error("Invalid JSON format", err);
    }
  };

  const handleCreateHostedZone = async () => {
    const hostedZoneData = { name: hostedZoneName };
    const record = {
      domain: recordDomain,
      type: recordType,
      ttl: recordTTL,
      value: recordValue,
      priority:priorityValue
    };
    dispatch(createRecord(hostedZoneData, record, token,navigate));
  };

  return (
    <section className="py-8 px-4 md:px-16 lg:px-24 rounded-lg shadow-lg bg-richblack-700">
      <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-white">Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Create Records in Bulk */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-100 mb-4 text-white">
            Create Records in Bulk
          </h3>
          <textarea
            placeholder='{"records": [{"domain": "domain.example1234.com", "type": "A", "ttl": "300", "value": "203.0.113.8"}]}'
            value={bulkRecordsInput}
            onChange={(e) => setBulkRecordsInput(e.target.value)}
            className="w-full h-64 border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleBulkCreate}
            className="w-full bg-richblack-300 hover:bg-richblack-500 text-white px-4 py-2 rounded-md transition-colors"
          >
            Bulk Create
          </button>
        </div>

        {/* Create Hosted Zone */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-100 mb-4 text-white">
            Create Hosted Zone
          </h3>
          <input
            type="text"
            placeholder="Hosted Zone Name"
            value={hostedZoneName}
            onChange={(e) => setHostedZoneName(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Record Domain"
            value={recordDomain}
            onChange={(e) => setRecordDomain(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Record Type"
            value={recordType}
            onChange={(e) => setRecordType(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Record TTL"
            value={recordTTL}
            onChange={(e) => setRecordTTL(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Record Value"
            value={recordValue}
            onChange={(e) => setRecordValue(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Priority Value if type is MX"
            value={priorityValue}
            onChange={(e) => setPriorityValue(e.target.value)}
            className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleCreateHostedZone}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors bg-richblack-300 hover:bg-richblack-500"
          >
            Create Hosted Zone
          </button>
        </div>
      </div>
    </section>
  );
};

export default Edit;



        // {/* Update Record */}
        // <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        //   <h3 className="text-xl font-semibold text-gray-100 mb-4">
        //     Update Record
        //   </h3>
        //   <input
        //     type="text"
        //     placeholder="Record ID"
        //     value={recordToUpdate}
        //     onChange={(e) => setRecordToUpdate(e.target.value)}
        //     className="w-full border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //   />
        //   <textarea
        //     placeholder='{"domain": "example.com", "type": "A", "ttl": "300", "value": "203.0.113.8"}'
        //     value={updateData}
        //     onChange={(e) => setUpdateData(e.target.value)}
        //     className="w-full h-32 border border-gray-600 rounded-md px-4 py-2 mb-4 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //   ></textarea>
        //   <button
        //     onClick={handleUpdate}
        //     className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
        //   >
        //     Update
        //   </button>
        // </div>