const express = require("express");
const router = express.Router();

const {createRecord,createBulkRecords,getRecords,updateRecord,deleteRecord} = require('../controllers/DNS');


//route to create a DNS record

router.post("/createRecord",createRecord);

// route to create Bulk DNS records 

router.post("/bulk",createBulkRecords);

// route to get a DNS record

router.get("/",getRecords);

// route to update a DNS record

router.put("/:recordId",updateRecord);

// route to delete a DNS record

router.delete("/:recordId",deleteRecord);


module.exports = router;