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
      console.log("GET_ALL_RECORDS API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      dispatch(setRecords(response.data.data))
      toast.success("Records Fetched Successfully")
    } catch(error){
      console.log("GET_ALL_RECORDS API ERROR............", error)
      toast.error("Fetch Records Failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
   }
}

export function deleteRecord(recordId,token){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("DELETE",DELETE_RECORD+`/${recordId}` , null , {
        Authorization: `Bearer ${token}`,
      })

      console.log("DELETE_RECORD API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      toast.success("Record Deleted Successfully")
    }catch(error){
      console.log("DELETE_RECORD API ERROR............", error)
      toast.error("Record deletion failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function createRecord(hostedZoneData, record,token){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",CREATE_RECORD , {hostedZoneData,record} , {
        Authorization: `Bearer ${token}`,
      })

      console.log("CREATE_RECORD API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      toast.success("Records created successfully")
    }catch(error){
      console.log("CREATE_RECORD API ERROR............", error)
      toast.error("Record creation failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function createBulkRecord(records,token){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",CREATE_BULK_RECORDS , {records} , {
        Authorization: `Bearer ${token}`,
      })

      console.log("CREATE_BULK_RECORDS API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      toast.success("BulkRecords created successfully")
    }catch(error){
      console.log("CREATE_BULK_RECORDS API ERROR............", error)
      toast.error("Bulk Record creation failed")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


export function updateRecord(record,recordId,token){
  return async(dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST",UPDATE_RECORD+`/${recordId}`, {record} , {
        Authorization: `Bearer ${token}`,
      })

      console.log("UPDATE_RECORD API RESPONSE............", response)
      if (!response.data.data) {
        throw new Error(response.data.message)
      }
      // need to do something think about it
      toast.success("Records updated successfully")
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
     console.log("GET_ALL_HOSTEDZONES API RESPONSE............", response)
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