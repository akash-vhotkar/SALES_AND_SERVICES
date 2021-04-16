const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Authcontroller = require('../Controller/Authapi');
router.get('/login', (req, res) => {
    Authcontroller.getlogin(req, res);
})
router.get('/register', (req, res) => {
    Authcontroller.getregister(req, res);
})
router.post('/register', (req, res) => {
    Authcontroller.handelregister(req, res);
})
router.post('/login', (req, res) => {
    Authcontroller.handellogin(req, res);
})
router.get('/logout', (req, res) => {
    Authcontroller.logout(req, res);
})
router.get('/forget', (req, res) => {
    Authcontroller.getforgetpage(req, res);
})
router.post('/forget', (req, res) => {
    Authcontroller.handelforgerpassword(req, res);

})
module.exports = router;