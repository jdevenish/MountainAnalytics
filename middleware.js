const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


const withAuth = function(req, res, next) {
    const token = req.param('token');
    if (!token) {
        res.status(401).send(`Unauthorized: No token provided; ${req.params}`);
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                console.log(decoded.email)
                req.email = decoded.email;
                next();
            }
        });
    }
};
module.exports = withAuth;