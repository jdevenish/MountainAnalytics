const RawData = require("../models/RawData");

const addData = (req, res) => {
    console.log("Add Data body = ", req.body.loadTime)
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

module.exports = {
    addData
};