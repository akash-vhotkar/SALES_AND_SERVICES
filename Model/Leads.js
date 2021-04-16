const mongoose = require('mongoose');
const shema = new mongoose.Schema({
    c_name: {
        type: String,
        required: false
    },
    lead_created_emp_id: {
        type: String,
        required: false
    },
    c_no: {
        type: String,
        required: false
    },
    leadid: {
        type: String,
        required: false
    },
    c_email: {
        type: String,
        required: false

    }, lead_type: {
        type: String,
        required: false
    }, lead_desc: {
        type: String,
        required: false
    },
    lead_status_string: {
        type: String,
        required: false
    },
    lead_closed_by_emp: {
        type: String,
        required: false
    },
    close_desc: {
        type: String,
        required: false
    },

    lead_status: {
        type: Boolean,
        required: true
    },
    forworded_to_dept_id: {
        type: String,
        required: false,
        default: "Null"
    },
    forworded_to_dept_name: {
        type: String,
        required: false,
        default: "Null"
    },
    forworded_to_emp_id: {
        type: String,
        required: false,
        default: "Null"
    },
    forworded_to_emp_name: {
        type: String,
        required: false,
        default: "Null"
    }


})

module.exports = mongoose.model('leads', shema);