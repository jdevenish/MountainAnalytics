const mongoose = require('../db/connection');


const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    is_admin: {type: Boolean, required: false},
    org: {
        ref: "Organization",
        type: mongoose.Schema.Types.Object
    }
});

//model
const User = mongoose.model("User", UserSchema);

//export
module.exports = User;
