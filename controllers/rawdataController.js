const RawData = require("../models/RawData");

const addData = (req, res) => {
    const newData = {
        siteId: req.body.siteId,
        loadTime: req.body.loadTime,
        screenWidth: req.body.screenWidth,
        deviceType: req.body.deviceType,
        geolocation: {
            lat: req.body.geolocation.lat,
            long: req.body.geolocation.long
        }
    };

    RawData.create(newData).then(() => {
        res.status(201).json({
            status: 201
        })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: err
            })
    })
};

module.exports = {
    addData
};