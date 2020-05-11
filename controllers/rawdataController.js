const RawData = require("../models/RawData");

const addData = (req, res) => {
    RawData.create(req.body).then(() => {
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

const getData = (req, res) => {
    RawData.find({"siteId": req.param('siteId')}).then(data => {
        res.status(200)
            .json({
                status: 200,
                data: data
            });
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: "Can't retrieve data",
                err: err
            });
    });
};

module.exports = {
    addData,
    getData
};