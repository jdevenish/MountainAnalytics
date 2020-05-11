const Auth = require("../models/Auth");
const User = require("../models/User");
const Org = require("../models/Organization");
const Domain = require("../models/Domain");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const getAll = (req, res) => {
    Domain.find({"_id": req.body.orgId }).then(domains => {
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
    });
};

const remove = (req, res) => {
    Domain.deleteOne({"_id": req.body._id}).then(ack => {
        Domain.find({"orgId": req.body.orgId }).then(domains => {
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