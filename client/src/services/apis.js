
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


// AUTH ENDPOINTS
export const authEndpoints = {

  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

}

// AWS route53 END_POINTS

export const awsEndpoints = {

  GET_ALL_RECORDS: BASE_URL + "/dashboard",
  DELETE_RECORD: BASE_URL + "/dashboard/delete",
  CREATE_BULK_RECORDS  : BASE_URL + "/dashboard/bulk",
  CREATE_RECORD : BASE_URL + "/dashboard/createRecord",
  UPDATE_RECORD : BASE_URL + "/dashboard/update"
}