const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    emp_name: {
        type: String,
        required: false
    },
    emp_id: {
        type: String,
        required: false
    },
    emp_username: {
        type: String,
        required: false
    },
    emp_password: {
        type: String,
        required: false
    },
    emp_email: {
        type: String,
        required: false
    },
    emp_mobile: {
        type: String,
        required: false
    },
    emp_adminid: {
        type: String,
        required: false
    },
    emp_deptid: {
        type: String,
        required: false
    },
    emp_type: {
        type: String,
        required: false
    },
    emp_code: {
        type: String,
        required: false
    }

})
const model = mongoose.model("User", userschema);
module.exports = model;