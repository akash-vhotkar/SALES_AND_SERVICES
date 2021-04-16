const departmentmodel = require('../Model/dept');
const descmodel = require('../Model/LeadDesc');
const empmodel = require('../Model/Employee');
const leadmodel = require('../Model/Leads');
const date = require('date-and-time');

module.exports = {
    getempdashboard: function (req, res) {
        leadmodel.find({ forworded_to_emp_id: req.session.empid, lead_status: false }).then(cust => {
            const messages = req.session.Empmessages
            res.render("EmployeeDashboard", { messages, cust })
        })

    },
    handelcloselead: function (req, res) {
        const leadid = req.body.leadid;
        leadmodel.findOneAndUpdate({ leadid: leadid }, {
            lead_status: true,
            close_desc: req.body.close_desc
        }, { new: true }, (err, data) => {
            if (data) {
                req.session.Empmessages = [{ msg: "Lead close successfully" }]
                res.redirect('/Emp/');
            }
            else {
                console.log(err);
            }
        })
    },
    getcloseleads: function (req, res) {
        leadmodel.find({ forworded_to_emp_id: req.session.empid, lead_status: true }).then(cust => {
            res.render("EmployeeCloseleads", { cust })

        })
    },
    getcalldesc: function (req, res, leadid) {
        descmodel.find({ leadid: leadid }).then(call => {
            res.render("EmployeeCalldesc", { call, leadid })

        }).catch(err => {
            if (err) console.log(err);
        })


    },
    addcall: function (req, res) {
        const now = new Date();

        const call = {
            call_desc: req.body.calldesc,
            call_motive: req.body.callmotive,
            leadid: req.body.leadid,
            call_date: date.format(now, 'YYYY/MM/DD '),
            call_time: date.format(now, 'HH:mm:ss'),
            call_emp_name: req.session.empname
        }
        descmodel.create(call).then(call => {

            res.redirect(`/Emp/calldesc/${req.body.leadid}`);

        }).catch(err => {
            if (err) console.log(err);
        })
    }
}