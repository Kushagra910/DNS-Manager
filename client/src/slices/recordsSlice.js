import { createSlice } from "@reduxjs/toolkit";


const initalState = {
  records : [],
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
  }
})

export const{ setRecords , setLoading,setUser} = recordSlice.actions;
export default recordSlice.reducer;