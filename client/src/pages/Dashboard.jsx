import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from '../components/dashboard/Card';
import { Link } from "react-router-dom";
import Table from '../components/dashboard/Table'

export const Dashboard = () => {
  const { records, hostedZones } = useSelector((state) => state.record);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (hostedZones && hostedZones?.hostedZonesWithRecords?.length > 0) {
      setData(hostedZones);
    }
  }, [hostedZones]);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto mt-10 font-inter ">
      <h1 className="text-4xl font-bold text-center text-gray-900 text-white mb-6">Hosted Zones</h1>
      {/* section-1 HostedZones */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap justify-center gap-6">
          {hostedZones && 
            hostedZones?.hostedZonesWithRecords?.map((zone, index) => (
              <Card hostedZone={zone.hostedZone} key={index} records={zone.records} />
            ))
          }
        </div>
      </section>

      {/* section-2 DNS Records */}
      <section>
         {data && <Table data={data}/>}
      </section>
    </div>
  );
};

// const Card = () => {
//   const { hostedZones } = useSelector((state) => state.record);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (hostedZones && hostedZones?.hostedZonesWithRecords?.length > 0) {
//       setData(hostedZones);
//     }
//   }, [hostedZones]);

//   // const getTotalRecordsCount = () => {
//   //   // return data.reduce((acc, zone) => acc + zone.records.length, 0);
//   //   return data.totalRecordsCount;
//   // };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 dark:bg-gray-900">
//       <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">DNS Management Dashboard</h1>
//       <div className="flex justify-between items-center">
//         <p className="text-lg text-gray-700 dark:text-gray-300">Hosted Zones:{data.hostedZonesCount}</p>
//         <p className="text-lg text-gray-700 dark:text-gray-300">Total Records: { data.totalRecordsCount}</p>
//       </div>
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.hostedZonesWithRecords?.map((zone) => (
//           <div key={zone.hostedZone.Id} className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{zone.hostedZone.Name}</h2>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">Record Count: {zone.records.length}</p>
//             <div className="mt-4">
//               <Bar
//                 data={{
//                   labels: zone.records.map((record, index) => `Record ${index + 1}`),
//                   datasets: [
//                     {
//                       label: 'TTL',
//                       data: zone.records.map((record) => record.TTL),
//                       backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                     }
//                   ]
//                 }}
//                 options={{
//                   scales: {
//                     y: {
//                       beginAtZero: true,
//                     },
//                   },
//                 }}
//               />
//             </div>
//             <div className="mt-4 space-y-2">
//               {zone.records.map((record, index) => (
//                 <div key={index} className="bg-gray-100 p-2 rounded-md dark:bg-gray-700">
//                   <p className="text-gray-700 dark:text-gray-300"><strong>Type:</strong> {record.Type}</p>
//                   <p className="text-gray-700 dark:text-gray-300"><strong>TTL:</strong> {record.TTL}</p>
//                   <p className="text-gray-700 dark:text-gray-300"><strong>Value:</strong> {record.ResourceRecords.map(r => r.Value).join(", ")}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
