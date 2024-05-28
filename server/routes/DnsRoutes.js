const express = require("express");
const router = express.Router();

const {createRecord,createBulkRecords,getRecords,updateRecord,deleteRecord} = require('../controllers/DNS');
const {auth} = require("../middlewares/auth");

//route to create a DNS record

router.post("/createRecord",auth,createRecord);

// route to create Bulk DNS records 

router.post("/bulk",auth,createBulkRecords);

// route to get a DNS record

router.get("/",auth,getRecords);

// route to update a DNS record

router.put("update/:recordId",auth,updateRecord);

// route to delete a DNS record

router.delete("delete/:recordId",auth,deleteRecord);


module.exports = router;