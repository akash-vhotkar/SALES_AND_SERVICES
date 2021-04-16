const empSchema = require('../Model/Employee');
const leadSchema = require('../Model/Leads');
const departmentallschema = require('../Model/dept')
const shortid = require('shortid');
const leadescschema = require('../Model/LeadDesc');
const date = require('date-and-time');
module.exports = {
    getReceptionhome: function (req, res) {
        const messages = req.session.Receptionmessages
        res.render("ReceptionDashboard", { messages });
    },
    createnewlead: function (req, res) {
        const newleaddata = {
            c_name: req.body.c_name,
            c_no: req.body.c_no,
            c_email: req.body.c_email,
            lead_type: req.body.lead_type,
            lead_status_string: "Pending",
            leadid: shortid.generate(),
            lead_desc: req.body.lead_desc,
            lead_status: false,
            lead_created_emp_id: req.session.empid
        }
        console.log(newleaddata);
        leadSchema.create(newleaddata).then(allleads => {
            req.session.Receptionmessages = [{ msg: `Customer ${req.body.c_name} added successfully` }]
            const messages = req.session.Receptionmessages
            res.redirect('/Reception/')

        }).catch(err => {
            if (err) console.log(err);
        })
    },
    getproduction: function (req, res) {
        res.render("Receptionproduction")
    },
    getservises: function (req, res) {
        res.render("Receptionservises")
    },
    getleads: function (req, res) {
        leadSchema.find({ lead_created_emp_id: req.session.empid, lead_status: false }).then(cust => {
            res.render("Receptionleadmanagemenent", { cust })

        }).catch(err => {
            if (err) console.log(err);
        })

    },
    handelcloseleds: function (req, res) {
        const leadid = req.body.leadid;
        leadSchema.findOneAndUpdate({ leadid: leadid }, {
            close_desc: req.body.close_desc,
            lead_status_string: "Close",
            lead_status: true
        }, { new: true }, (err, empdata) => {
            if (empdata) {
                req.session.Receptionmessages = [{ msg: `Lead close succefully` }]
                res.redirect('/Reception/');
            } else {
                console.log(err);
            }
        })


    },
    getassiglead: function (req, res, leadid) {
        //ReceptionAssignlead
        empSchema.findOne({ emp_id: req.session.empid }).then(empdata => {
            const emp_adminid = empdata.emp_adminid;
            departmentallschema.find({ adminid: emp_adminid }).then(alldepts => {
                leadSchema.findOne({ leadid: leadid }).then(allleaddata => {
                    const c_name = allleaddata.c_name;
                    const c_email = allleaddata.c_email;
                    const c_no = allleaddata.c_no;
                    res.render("ReceptionAssignlead", { alldepts, leadid, c_name, c_email, c_no })

                }).catch(err => {
                    if (err) console.log(err);
                })

            }).catch(err => {
                if (err) console.log(err);
            })


        }).catch(err => {
            if (err) console.log(err);
        })



    },
    handelassignlead: function (req, res, leadid, dept_id) {
        departmentallschema.findOne({ _id: dept_id }).then(deptdata => {
            leadSchema.findOneAndUpdate({ leadid: leadid }, {
                forworded_to_dept_id: deptdata.dept_id,
                forworded_to_dept_name: deptdata.dept_name,
                lead_status_string: "Pending"
            }, { new: true }, (err, leaddata) => {
                if (leaddata) {
                    req.session.Receptionmessages = [{ msg: `lead is assign to ${deptdata.dept_name}` }]
                    res.redirect('/Reception')
                }
                else {
                    console.log(err);
                }

            })
        }).catch(err => {
            if (err) console.log(err);
        })
    },
    getcloselead: function (req, res) {

        leadSchema.find({ lead_created_emp_id: req.session.empid, lead_status: true }).then(cust => {
            res.render("ReceptionCloseleads", { cust })


        }).catch(err => {
            if (err) console.log(err);
        })

    },
    getcalldesc: function (req, res, leadid) {
        leadescschema.find({ leadid: leadid }).then(call => {
            res.render("Calldesc", { call, leadid })

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
        leadescschema.create(call).then(call => {
            res.redirect(`/Reception/calldesc/${req.body.leadid}`);


        }).catch(err => {
            if (err) console.log(err);
        })
    }
}