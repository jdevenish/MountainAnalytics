const Auth = require("../models/Auth");
const User = require("../models/User");
const Org = require("../models/Organization");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const registerNewUser = (req, res) => {
    const newCreds = {
        email: req.body.email,
        password: req.body.password
    };

    Auth.create(newCreds).then(auth =>{

        Org.findById(req.body.orgId).then(org => {
            const newUser = {
                email: auth.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                is_Admin: false,
                org: org
            };
            const token = jwt.sign({email: auth.email}, secret, {
                expiresIn: '1h'
            });

            User.create(newUser).then(user => {
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
        }).catch(err => {
            res.status(200)
                .json({
                    status: 500,
                    error: "Can't find matching organization.",
                    err: err
                });
        })
    }).catch(err =>{
        res.status(200)
            .json({
                status: 500,
                error: "Error registering new user please try again.",
                requestBody: req.body,
                err: err
            });
    });

};

const updateUser = (req, res) => {
    res.status(200).json({
        status: 200,
        error: "Update user API is not complete"
    })
};

const deleteUser = (req, res) => {
    res.status(200).json({
        status: 200,
        error: "Delete user API is not complete"
    })
};

module.exports = {
    registerNewUser,
    updateUser,
    deleteUser
};