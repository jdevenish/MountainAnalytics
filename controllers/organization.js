const Auth = require("../models/Auth");
const User = require("../models/User");
const Org = require("../models/Organization");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const registerNewOrg = (req, res) => {
    const newOrg = {
        name: req.body.orgName,
        createdOn: new Date()
    };

    Org.create(newOrg).then(org => {
        const newCreds = {
            email: req.body.email,
            password: req.body.password
        };

        Auth.create(newCreds).then(auth =>{
            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                is_admin: true,
                org: org
            };

            User.create(newUser).then(user => {
                const token = jwt.sign({email: auth.email}, secret, {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    status: 200,
                    token: token,
                    userProfile: user
                })
            }).catch(err => {
                res.status(200)
                    .json({
                        status: 500,
                        error: "Error creating user profile.",
                        user: newUser,
                        err: err
                    });
            })
        }).catch(err =>{
            res.status(200)
                .json({
                    status: 500,
                    error: "Error registering new credentials. Please contact your admin.",
                    requestBody: req.body,
                    err: err
                });
        });
    }).catch(err => {
        res.status(200)
            .json({
                status: 500,
                error: "Error creating new organization",
                requestBody: req.body,
                err: err
            });
    })
};

const updateOrgName = (req, res) => {
    res.status(200)
        .json({
            status: 500,
            error: "Endpoint not finished"
        });
};

const deleteOrg = (req, res) => {
    res.status(200)
        .json({
            status: 500,
            error: "Endpoint not finished",
        });
};

module.exports = {
    registerNewOrg,
    updateOrgName,
    deleteOrg
};