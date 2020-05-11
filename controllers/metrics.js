const Domain = require("../models/Domain");
const Metric = require("../models/Metrics")
require('dotenv').config();


const getForDomain = (req, res) => {
    Metric.find({"domainId": req.param('domainId') }).then(metric => {
        res.status(200)
            .json({
                status: 200,
                metrics: metric
            })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                message: "Error retrieving metrics",
                error: err
            })
    })
};


module.exports = {
    getForDomain
};