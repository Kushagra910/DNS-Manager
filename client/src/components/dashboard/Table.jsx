import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { deleteRecord, updateRecord } from '../../services/operations/recordsApi';

const Table = ({ data }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [tableData, setTableData] = useState(data?.hostedZonesWithRecords?.[0]?.records || []);
  const {token} = useSelector((state) => state.auth)
  const {records} = useSelector((state) => (state.record));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const zone = data.hostedZonesWithRecords?.find(zone => zone?.hostedZone?.Name === selectedZone);
    // if (!zone) {
    //   console.log("ZONE DATA EMPTY FOR TABLE", zone);
    // }
    setTableData(zone?.records || []);
  }, [selectedZone, data.hostedZonesWithRecords]);

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const deleteHandler = async (recordName) => {
    // console.log("RECORD NAME", recordName);
    const recordToDelete = records.find((record) => `${record.domain}.` === recordName);
    
    if (!recordToDelete) {
      console.error("Record to delete not found");
      return;
    }
  
    const record = {
      _id: recordToDelete._id,
      domain: recordToDelete.domain,
      type: recordToDelete.type,
      value: recordToDelete.value,
      ttl: recordToDelete.ttl,
      ...(recordToDelete.type === 'MX' && { priority: recordToDelete.priority })
    };
  
    console.log("RECORD TO DELETE", record);
  
    dispatch(deleteRecord(record, token));
  };

  const updateHandler = async (recordName) => {
    const recordToUpdate = records.find((record) => `${record.domain}.` === recordName);
      navigate(`/update/${recordToUpdate._id}`);
  }

  return (
    <section className="px-6 py-8 mt-6">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-richblack-5">DNS Records</h1>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Select Dropdown */}
          <select
            className="border border-gray-300 font-inter  focus:outline-none px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg"
            value={selectedZone}
            onChange={handleZoneChange}
          > 
            <option value="" className='text-richblack-500'>Choose Zone</option>
            {data?.hostedZonesWithRecords?.map((zone, id) => (
              <option value={zone?.hostedZone?.Name} key={id}>
                {zone?.hostedZone?.Name}
              </option>
            ))}
          </select>

          {/* Create Record Button */}
          <Link to="/createRecord">
            <div className="bg-richblue-300 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-richblue-100 transition-colors">
              + Create Record
            </div>
          </Link>
        </div>
      </div>

      {/* Table Placeholder */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300 dark:border-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-900">
          <thead className="bg-richblack-5 dark:bg-gray-800">
            <tr>
              <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Name</th>
              <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Type</th>
              <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Value</th>
              <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">TTL</th>
              <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 ? (
              tableData.map((record, index) => (
                <tr key={index} className="border-b bg-richblack-100 hover:bg-richblack-300 hover:text-richblack-5 transition-colors text-richblack-900">
                  <td className='py-2 px-4 text-gray-800 dark:text-gray-300'>{record.Name}</td>
                  <td className='py-2 px-4 text-gray-800 dark:text-gray-300'>{record.Type}</td>
                  <td className='py-2 px-4 text-gray-800 dark:text-gray-300'>
                    {record.ResourceRecords.map((resource, idx) => (
                      <div key={idx}>{resource.Value}</div>
                    ))}
                  </td>
                  <td className='py-2 px-4 text-gray-800 dark:text-gray-300'>{record.TTL}</td>
                  <td className='py-2 px-4'>
                    <div className="flex gap-2">
                      {record.Type !== 'SOA' && record.Type !== 'NS' && (<button onClick={() => updateHandler(record.Name)} className=" bg-yellow-5 text-richblack-900 font-semibold px-2 py-1 rounded hover:bg-yellow-50 transition-colors" >Update</button>)}
                      {((record.Type === 'SOA' || record.Type === 'NS') ? (<></>) : (<button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-pink-500 transition-colors" onClick={()=>(deleteHandler(record.Name))}>Delete</button>)) }
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="py-2 px-4 text-center text-richblack-900 dark:text-gray-300" colSpan="5">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
