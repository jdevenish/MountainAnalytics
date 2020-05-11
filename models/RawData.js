const mongoose = require('../db/connection');



// schema
const RawDataSchema = new mongoose.Schema({
    loadTime: Number,
    screenWidth: Number,
    geolocation: {
        lat: Number,
        long: Number
    },
    deviceType: String,
    siteId: {
        ref: "Domain",
        type: mongoose.Schema.Types.ObjectId
    }
});

//model
const RawData = mongoose.model("RawData", RawDataSchema);

//export
module.exports = RawData;