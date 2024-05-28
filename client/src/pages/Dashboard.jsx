import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecords } from '../services/operations/recordsApi';


export const Dashboard = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {records} = useSelector((state) => (state.record));
  useEffect(() => {
    if (token) {
      dispatch(getAllRecords(token));
    }
  }, [dispatch, token]);
  console.log("RECORDS" , records);
  return (
    <div>Dashboard</div>
  )
}
