import { createSlice } from "@reduxjs/toolkit";


const initalState = {
  records : [],
  hostedZones : null,
  loading : false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
}

const recordSlice = createSlice({
  name : "record",
  initialState : initalState,
  reducers : {
    setRecords(state,value){
      state.records = value.payload
    } ,
    setLoading(state,value){
      state.loading = value.payload
    },
    setUser(state, value) {
      state.user = value.payload;
    },
    setHostedZones(state,value){
      state.hostedZones = value.payload
    }
  }
})

export const{ setRecords , setLoading,setUser,setHostedZones} = recordSlice.actions;
export default recordSlice.reducer;