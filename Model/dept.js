const mongoose = require('mongoose');
const deptschema = mongoose.Schema({
    adminid: {
        type: String,
        required: false
    },
    hodid: {
        type: String,
        required: false,
        default: null
    },
    hodname: {
        type: String,
        required: false,
        default: null
    },
    hodemail: {
        type: String,
        required: false,
        default: null
    },
    dept_name: {
        type: String,
        required: false
    },
    dept_id: {
        type: String,
        required: false
    }, dept_desc: {
        type: String,
        required: false
    },
    dept_image: {
        type: String,
        required: false
    }
})
const deptmodel = mongoose.model("department", deptschema)
module.exports = deptmodel