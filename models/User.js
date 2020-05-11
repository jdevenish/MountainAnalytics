const mongoose = require('../db/connection');


const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    is_Admin: {type: Boolean, required: false},
    org: {
        ref: "Organization",
        type: mongoose.Schema.Types.ObjectId
    }
});

//model
const User = mongoose.model("User", UserSchema);

//export
module.exports = User;
