const mongoose = require('mongoose');

const dnsRecordSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  ttl: {
    type: Number,
    required: true
  },
  priority: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  port: {
    type: Number,
    required: false
  },
  target: {
    type: String,
    required: false
  },
  keyTag: {
    type: Number,
    required: false
  },
  algorithm: {
    type: Number,
    required: false
  },
  digestType: {
    type: Number,
    required: false
  },
  digest: {
    type: String,
    required: false
  } 
})


const DNSrecord = mongoose.model("DNS",dnsRecordSchema);
module.exports = DNSrecord;