const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const departmentSchema = require('../Model/dept');
const employeeSchema = require('../Model/Employee');
const RecceptionController = require('../Controller/Reception')
router.use((req, res, next) => {
    if (req.session.empid && req.session.empcode) {
        if (req.session.empcode == "3333") {
            next();
        }
        else {
            req.session.Loginmessages = [{ msg: "You do not have access to this page  !" }];
            res.redirect('/auth/login');


        }

    }
    else {
        req.session.Loginmessages = [{ msg: "Please login  !" }];
        res.redirect('/auth/login');


    }
})
router.get('/', (req, res) => {
    RecceptionController.getReceptionhome(req, res);

});
router.post('/Addlead', (req, res) => {
    RecceptionController.createnewlead(req, res);
})
router.get('/servises', (req, res) => {
    RecceptionController.getservises(req, res);

})
router.get('/leads', (req, res) => {
    RecceptionController.getleads(req, res);

})
router.get('/production', (req, res) => {
    RecceptionController.getproduction(req, res);

})

router.get('/Assign/:leadid', (req, res) => {
    RecceptionController.getassiglead(req, res, req.params.leadid);
})
router.post('/Assign/:leadid', (req, res) => {
    const departmentid = req.body.departmentid;
    console.log(departmentid);
    RecceptionController.handelassignlead(req, res, req.params.leadid, departmentid);

})
router.post('/close', (req, res) => {
    RecceptionController.handelcloseleds(req, res);

})
router.get('/close/leads', (req, res) => {
    RecceptionController.getcloselead(req, res);
})
router.get("/calldesc/:leadid", (req, res) => {
    RecceptionController.getcalldesc(req, res, req.params.leadid);
})
router.post('/calldesc/addcall', (req, res) => {
    RecceptionController.addcall(req, res);

})
module.exports = router;