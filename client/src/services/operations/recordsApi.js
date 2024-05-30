import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { awsEndpoints } from "../apis";
const {GET_ALL_RECORDS, DELETE_RECORD, CREATE_BULK_RECORDS ,CREATE_RECORD,UPDATE_RECORD,GET_ALL_HOSTEDZONES } = awsEndpoints;
import { setRecords,setLoading,setHostedZones } from "../../slices/recordsSlice";

export function getAllRecords (token) {
   return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("GET",GET_ALL_RECORDS,null,{
        Authorization: `Bearer ${token}`,
      });
      // console.log("GET_ALL_RECORDS API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      dispatch(setRecords(response.data.data))
    } catch(error){
      console.log("GET_ALL_RECORDS API ERROR............", error)
      toast.error("Fetch Records Failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
   }
}

export function deleteRecord(record, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      // Adjust the payload based on record type
      let recordData;
      if (record.type === "MX") {
        recordData = {
          domain: record.domain,
          type: record.type,
          ttl: record.ttl,
          priority: record.priority,
          value: record.value
        };
      } else {
        recordData = {
          domain: record.domain,
          type: record.type,
          ttl: record.ttl,
          value: record.value
        };
      }

      const response = await apiConnector("DELETE", DELETE_RECORD+`/${record._id}`, recordData, {
        Authorization: `Bearer ${token}`,
      });

      // console.log("DELETE_RECORD API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(getAllHostedZones(token));
      dispatch(getAllRecords(token));
      toast.success("Record Deleted Successfully");
    } catch (error) {
      console.log("DELETE_RECORD API ERROR............", error);
      toast.error("Record deletion failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}




export function createRecord(hostedZoneData, record,token,navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",CREATE_RECORD , {hostedZoneData,record} , {
        Authorization: `Bearer ${token}`,
      })

      // console.log("CREATE_RECORD API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      dispatch(getAllHostedZones(token));
      dispatch(getAllRecords(token));
      toast.success("Records created successfully")
      navigate('/dashboard');
    }catch(error){
      console.log("CREATE_RECORD API ERROR............", error)
      toast.error("Record creation failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function createBulkRecord(records,token,navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",CREATE_BULK_RECORDS , {records} , {
        Authorization: `Bearer ${token}`,
      })

      // console.log("CREATE_BULK_RECORDS API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      dispatch(getAllHostedZones(token));
      dispatch(getAllRecords(token));
      navigate('/dashboard');
      toast.success("BulkRecords created successfully")
    }catch(error){
      console.log("CREATE_BULK_RECORDS API ERROR............", error)
      toast.error("Bulk Record creation failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function updateRecord(record,recordId,token,navigate){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",UPDATE_RECORD+`/${recordId}`, {record} , {
        Authorization: `Bearer ${token}`,
      })

      // console.log("UPDATE_RECORD API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      dispatch(getAllHostedZones(token));
      dispatch(getAllRecords(token));
      toast.success("Records updated successfully")
      navigate('/dashboard');
    }catch(error){
      console.log("UPDATE_RECORD API ERROR............", error)
      toast.error("Record updation failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function getAllHostedZones (token) {
  return async(dispatch) => {
   const toastId = toast.loading("Loading...");
   dispatch(setLoading(true));
   try{
     const response = await apiConnector("GET",GET_ALL_HOSTEDZONES,null,{
       Authorization: `Bearer ${token}`,
     });
    //  console.log("GET_ALL_HOSTEDZONES API RESPONSE............", response)
     if (!response.data.data) {
       throw new Error(response.data.message)
     }
     dispatch(setHostedZones(response.data.data))
     toast.success("HostedZones Fetched Successfully")
   } catch(error){
     console.log("GET_ALL_HOSTEDZONES API ERROR............", error)
     toast.error("Fetch HostedZones Failed")
   }
   dispatch(setLoading(false));
   toast.dismiss(toastId);
  }
}