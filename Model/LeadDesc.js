const express = require('express');
const mongoose = require('mongoose');
const date = require('date-and-time');
const now = new Date();
const callschema = mongoose.Schema({
    leadid: {
        type: String,
        required: false
    },
    call_desc: {
        type: String,
        required: false
    },
    call_motive: {
        type: String,
        required: false
    },
    call_date: {
        type: String,
        default: date.format(now, 'YYYY/MM/DD')
    },
    call_time: {
        type: String,
        default: date.format(now, 'YYYY/MM/DD HH:mm:ss')
    },
    call_emp_name: {
        type: String
    }

})
const model = mongoose.model("Calldesc", callschema);
module.exports = model;