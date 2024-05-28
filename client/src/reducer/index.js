import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import recordsSlice from "../slices/recordsSlice";



const rootReducer = combineReducers({
    auth : authReducer,
    record : recordsSlice

});

export default rootReducer;