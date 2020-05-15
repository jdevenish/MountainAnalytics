const Domain = require("../models/Domain");
const Metric = require("../models/Metrics");
require('dotenv').config();


const getAll = (req, res) => {
    Domain.find({"orgId": req.param('orgId') }).then(domains => {
        res.status(200)
            .json({
                status: 200,
                domains: domains
            })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                message: "Error retrieving domains",
                error: err
            })
    })
};

const createNew = (req, res) => {
    const newDomain = {
        name: req.body.name,
        url: req.body.url,
        createdOn: new Date(),
        status: "Active",
        orgId: req.body.orgId,
    };

    Domain.create(newDomain).then(domain => {

        const newMetric = {
            domainId: domain._id,
            loadTimes: {
                high: 0,
                low: 0,
                avg: 0,
                data: {
                    time: []
                }
            },
            browser: {
                chrome: 0,
                firefox: 0,
                safari: 0,
                ie: 0,
                other: 0
            },
            deviceType: {
                mobile: 0,
                tablet: 0,
                desktop: 0
            },
            location: []
        };
        Metric.create(newMetric).then(metric => {

            Domain.find({"orgId": domain.orgId }).then(domains => {
                res.status(200)
                    .json({
                        status: 200,
                        domains: domains
                    })
            }).catch(err => {
                res.status(200)
                    .json({
                        status: 500,
                        message: "Error retrieving domains after creating",
                        error: err
                    })
            })
        }).catch(err => {
            res.status(200)
                .json({
                    status: 500,
                    message: "Error creating Metrics object",
                    error: err
                })
        })
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                message: "Error creating domain",
                err: err
            })

    })
};

const remove = (req, res) => {
    Domain.deleteOne({"_id": req.param('domainId')}).then(ack => {
        Domain.find({"orgId": req.param('orgId')}).then(domains => {
            res.status(200)
                .json({
                    status: 200,
                    domains: domains
                })
        }).catch(err => {
            res.status(200)
                .json({
                    status: 500,
                    message: "Error retrieving domains after deleting",
                    error: err
                })
        })
    });
};

module.exports = {
    getAll,
    createNew,
    remove
};