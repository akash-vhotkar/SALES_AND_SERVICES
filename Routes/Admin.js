const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const shortid = require('shortid');
const Admincontroller = require('../Controller/Adminapi')
const multer = require('multer')
const gridfsstorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto');
const path = require('path')

router.use((req, res, next) => {
    if (req.session.empid && req.session.empcode) {
        if (req.session.empcode == "1111") {
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
const url = "mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/salesandservises?retryWrites=true&w=majority";
const conn = mongoose.createConnection(url);
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

})


const storage = new gridfsstorage({
    url: url,
    destination: './public/uploads/',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
}).single('file')



router.get('/image/:filename', (req, res) => {

    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (file) {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
    })

})







router.get('/', (req, res) => {

    Admincontroller.AdminDashboard(req, res);



})
router.post('/adddept', (req, res) => {
    upload(req, res, err => {
        if (err) console.log(err);
        else {
            const filename = req.file.filename;
            Admincontroller.handelAdddepartment(req, res, filename);
        }
    })




})
router.get('/Addemp/:deptid', (req, res) => {
    Admincontroller.getaddemp(req, res, req.params.deptid);

})
router.post('/Addemp/:deptid', (req, res) => {

    upload(req, res, err => {
        if (err) console.log(err);
        else {
            const filename = req.file.filename;

            Admincontroller.handeladdemp(req, res, req.params.deptid, filename)
        }
    })

})
router.get('/Allemp', (req, res) => {
    Admincontroller.getallemp(req, res);
})
module.exports = router;