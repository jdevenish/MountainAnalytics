const Auth = require("../models/Auth");
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
    User.findOne({"userId": req.email}).then(user => {
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

const registerNewUser = (req, res) => {
    Auth.create(req.body).then(auth =>{
        const newUser = {
            userId: auth.email,
            targetCompanies: [],
            networkingContacts: [],
            jobSearchMaterials: {
                brandStatement: "",
                coverLetter: "",
                resume: "",
                gitHub: "",
                linkedIn: "",
                repl: "",
                codeSandBox: "",
                profileSite: ""
            }
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

const authenticateCredentials = (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "https://seirproj3jobtracker.netlify.app")
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
                    console.log("Trying to find user: ", auth.email);
                    User.findOne({"userId": auth.email}).then(user => {
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
    // res.setHeader("Access-Control-Allow-Origin", "https://seirproj3jobtracker.netlify.app");
    console.log("Deleting account for : ", req.email)
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
    registerNewUser,
    authenticateCredentials,
    isValid,
    deleteAccount
};