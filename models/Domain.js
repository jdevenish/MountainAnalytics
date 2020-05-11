const mongoose = require('../db/connection');



// schema
const DomainSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: String,
    url: { type: String, required: true},
    createdOn: Date,
    orgId: {
        ref: "orgId",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    metrics: {
        ref: "DomainMetrics",
        type: mongoose.Schema.Types.ObjectId
    }
});

//model
const Domain = mongoose.model("Domain", DomainSchema);

//export
module.exports = Domain;