const mongoose = require('../db/connection');



// schema
const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdOn: Date
});

//model
const Organization = mongoose.model("Organization", OrganizationSchema);

//export
module.exports = Organization;