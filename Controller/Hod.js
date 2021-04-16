const departmentmodel = require('../Model/dept');
const empmodel = require('../Model/Employee');
const leadmodel = require('../Model/Leads');
const calldescmodel = require('../Model/LeadDesc');
const date = require('date-and-time');
module.exports = {
    gethodhashboard: function (req, res) {
        // pendingtoassign
        // closedleads
        // productionleads
        empmodel.findOne({ emp_id: req.session.empid }).then(hoddata => {
            const hoddeptid = hoddata.emp_deptid;
            empmodel.find({ emp_deptid: hoddeptid }).then(emp => {




                leadmodel.find({ forworded_to_dept_id: hoddeptid, lead_status_string: "Pending" }).then(pendingtoassign => {


                    leadmodel.find({ forworded_to_dept_id: hoddeptid, lead_status_string: "Close" }).then(closedleads => {
                        leadmodel.find({ forworded_to_dept_id: hoddeptid, lead_status_string: "Assign" }).then(productionleads => {
                            const messages = req.session.Hodmessages;
                            res.render("HodDashboard", { emp, pendingtoassign, closedleads, productionleads, messages });

                        }).catch(err => {
                            if (err) console.log(err);
                        })

                    }).catch(err => {
                        if (err) console.log(err);
                    })

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
    getAssignlead: function (req, res, leadid) {
        leadmodel.findOne({ leadid: leadid }).then(leaddata => {
            const c_name = leaddata.c_name;
            const c_email = leaddata.c_email;
            const c_no = leaddata.c_no

            empmodel.findOne({ emp_id: req.session.empid }).then(hoddata => {
                const hoddeptid = hoddata.emp_deptid;
                empmodel.find({ emp_deptid: hoddeptid }).then(allemp => {
                    const messages = req.session.Hodmessages;

                    res.render("HodAssignlead", { leadid, c_name, c_email, c_no, allemp });


                }).catch(err => {
                    if (err) console.log(err);
                })
            }).catch(err => {
                if (err) console.log(err);
            })

        }).catch(err => {
            console.log(err);
        })
    },
    handelAssignled: function (req, res, leadid) {
        const dbempid = req.body.emp_id;
        empmodel.findOne({ _id: dbempid }).then(empdata => {
            const employeename = empdata.emp_name;
            const employeeid = empdata.emp_id;
            leadmodel.findOneAndUpdate({ leadid: leadid }, {
                forworded_to_emp_id: employeeid,
                forworded_to_emp_name: employeename,
                lead_status_string: "Assign"
            }, { new: true }, (err, data) => {
                if (data) {
                    console.log("emp data after hod  assign ", data);
                    req.session.Hodmessages = [{ msg: `now ${empdata.emp_name} is working on it ` }]
                    res.redirect('/Hod/');


                }
                else {
                    console.log(err);
                }


            })


        }).catch(err => {
            if (err) console.log(err);
        })

    },
    handelcloselead: function (req, res) {
        const leadid = req.body.leadid;

        leadmodel.findOneAndUpdate({ leadid: leadid }, {
            lead_status_string: "Close",
            lead_status: true
        }, { new: true }, (err, data) => {
            if (data) {
                req.session.Hodmessages = [{ msg: "Lead closed successfully" }]
                res.redirect('/Hod/');
            }
            else {
                console.log(err);
            }


        })



    },
    getcalldesc: function (req, res, leadid) {
        calldescmodel.find({ leadid: leadid }).then(call => {
            res.render("Hodcalldesc", { call, leadid })

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
        calldescmodel.create(call).then(call => {

            res.redirect(`/Hod/calldesc/${req.body.leadid}`);

        }).catch(err => {
            if (err) console.log(err);
        })
    }
}