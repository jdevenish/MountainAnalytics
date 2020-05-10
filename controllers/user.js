const User = require("../models/User");



const updateProfile = (req, res) => {
    console.log("request body = ", req.body)
    User.replaceOne(
        {"userId" : req.body.userId},
        {
            "userId": req.body.userId,
            "jobSearchMaterials" : req.body.jobSearchMaterials,
            "targetCompanies" : req.body.targetCompanies,
            "networkingContacts" : req.body.networkingContacts
        }
    ).then(ack => {
        if(ack.nModified < 1){
            res.json({
                status: 401,
                message: `Profile could not be found for ${req.body.userId}`
            })
        } else {
            res.json({
                status: 200,
                message: `Update Profile for ${req.body.userId}`
            })
        }
    }).catch(err => {
        res.json({
            status: 500,
            message: "Error updating user profile. Please try again later",
            error: err
        })
    })

};

module.exports = {
    updateProfile
};