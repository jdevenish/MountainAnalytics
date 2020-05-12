const Auth = require("../models/Auth");
const User = require("../models/User");
const Org = require("../models/Organization");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const isValid = (req, res) => {
    // Issue token
    const payload = { email : req.email };
    const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
    });
    User.findOne(payload).then(user => {
        res.status(200).json({
            status: 200,
            token: token,
            userProfile: user
        })
    }).catch(err =>{
        res.status(200)
            .json({
                status: 500,
                error: "Error verifying user please try again.",
                err: err
            });
    });
};

const authenticateCredentials = (req, res) => {
    const { email, password } = req.body;
    Auth.findOne({ email: req.body.email }).then(auth => {
        if (!auth) {
            res.status(200)
                .json({
                    status: 401,
                    error: 'Incorrect email or password'
                });
        } else {
            bcrypt.compare(password, auth.password).then(same => {
                if(!same){
                    res.status(200).json({
                        status: 401,
                        error: 'Incorrect email or password'
                    });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    User.findOne({"email": auth.email}).then(user => {
                        if(!user){
                            res.status(200).json({
                                status: 401,
                                userProfile: "user profile not found"
                            })
                        } else {
                            res.status(200).json({
                                status: 200,
                                token: token,
                                userProfile: user
                            })
                        }
                    }).catch(err => {
                        res.status(500).json({
                            status: 500,
                            token: token,
                            error: err
                        })
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    status: 500,
                    error: err
                })
            })
        }
    });
};

const deleteAccount = (req, res) => {
    Auth.deleteOne({ email: req.email }).then(ackAuth => {
        if(ackAuth.deletedCount < 1){
            res.status(200).json({
                status: 500,
                error: "Error deleting account"
            })
        } else {
            User.deleteOne({ "userId" : req.email }).then(ackUser =>{
                if(ackUser.deletedCount < 1){
                    res.status(200).json({
                        status: 500,
                        error: "Error deleting account"
                    })
                } else {
                    res.status(200).json({
                        status: 200,
                        message: "Account deleted"
                    })
                }
            }).catch(err => {
                res.status(200).json({
                    status: 500,
                    error: err
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            status: 500,
            error: err
        })
    })
};

module.exports = {
    authenticateCredentials,
    isValid,
    deleteAccount
};