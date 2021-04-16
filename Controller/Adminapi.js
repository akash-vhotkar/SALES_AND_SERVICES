const shortid = require('shortid');
const deptSchema = require('../Model/dept');
const empSchema = require('../Model/Employee');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const transporter = require('../config/key').transporter;

module.exports = {
    AdminDashboard: function (req, res) {
        deptSchema.find({ adminid: req.session.empid }).then(depts => {
            empSchema.find({ emp_adminid: req.session.empid }).then(emp => {
                const newdeptid = shortid.generate();
                const messages = req.session.Adminmessages;

                res.render("AdminDashboard", { newdeptid, depts, emp, messages });
            }).catch(err => {
                if (err) console.log(err);
            })
        }).catch(err => {
            if (err) console.log(err);
        })


    },
    handelAdddepartment: function (req, res, filename) {
        const departmenname = req.body.dept_name;
        const departmentid = req.body.dept_id;
        const departmtdesc = req.body.dept_desc;
        deptSchema.findOne({ dept_name: departmenname }).then(deptdata => {
            if (deptdata) {
                req.session.Adminmessages = [{ msg: `departmenet ${departmenname} already exist !` }]
                res.redirect("/Admin/")

            }
            else {
                const newdepartment = {
                    dept_name: departmenname,
                    dept_id: departmentid,
                    dept_desc: departmtdesc,
                    adminid: req.session.empid,
                    dept_image: filename
                }
                deptSchema.create(newdepartment).then(alldepartment => {
                    req.session.Adminmessages = [{ msg: "department added successfully " }]
                    res.redirect("/Admin/")

                }).catch(err => {
                    if (err) console.log(err);
                })

            }
        }).catch(err => {
            if (err) console.log(err);
        })

    },
    getaddemp: function (req, res, dept_id) {
        empSchema.find({ emp_deptid: dept_id, emp_adminid: req.session.empid }).then(emp => {
            const password = shortid.generate();

            res.render("Adminaddemployee", { emp, dept_id, password });
        }).catch(err => {
            console.log(err);
        })
    },
    handeladdemp: function (req, res, dept_id, filename) {
        deptSchema.findOne({ dept_id: dept_id }).then(departmentdata => {
            const password = shortid.generate();
            console.log(password);

            bcrypt.hash(password, 10, function (err, hash) {
                const newemp = {
                    emp_name: req.body.emp_name,
                    emp_username: req.body.emp_name,
                    emp_email: req.body.emp_email,
                    emp_password: hash,
                    emp_adminid: req.session.empid,
                    emp_deptid: dept_id,
                    emp_image: filename,
                    emp_code: req.body.emp_code,
                    emp_id: shortid.generate()

                }

                empSchema.create(newemp).then((empdata) => {
                    req.session.Adminmessages = [{ msg: `${newemp.emp_username} is added in department ${departmentdata.dept_name}` }]
                    transporter.sendMail({
                        from: '"Salse And service 👻" saleandservises@gmail.com', // sender address
                        to: newemp.emp_email, // list of receivers
                        subject: "change password", // Subject line
                        text: "Hello world?", // plain text body
                        html: `<h1>hello ${req.body.emp_name}</h1> <p>welcome in ${departmentdata.dept_name} department</p>  <p> username : ${newemp.emp_name} </p>  <p>password : ${password} </p>  <a href= "http://dev.hardcipher.io/auth/login">login and change password</a>`, // html body
                    }).then(info => {
                        req.session.Adminmessages = [{ msg: "Employee  added successfully " }]


                        res.redirect("/Admin/")

                    }).catch(err => {
                        if (err) console.log(err);
                    })






                }).catch(err => {
                    console.log(err);
                })
            })

        }).catch(err => {
            if (err) console.log(err);
        })


    },
    getallemp: function (req, res) {
        empSchema.find({ emp_adminid: req.session.empid }).then(emp => {
            res.render("AdminAllemployees", { emp })


        }).catch(err => {
            if (err) console.log(err);
        })

    }
}