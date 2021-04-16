const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const ejs = require('ejs');
const session = require('express-session');
const url = require('./config/key').url;
const flash = require('flash');
const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', "ejs");
app.use(express.static('./public'))
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log("database connected")).catch(err => { console.log(err); })
app.use(session({
    secret: "secreat",
    resave: true,
    saveUninitialized: false
}))
app.use(require('flash')());

app.use(function (req, res, next) {
    // flash a message
    req.flash('info', 'hello!');
    next();
})


//routes
app.get('/', (req, res) => {
    res.render("Home")
})


app.use('/auth', require('./Routes/Authtication'));
app.use('/Reception', require('./Routes/Reception'));
app.use('/Hod', require('./Routes/Hod'));
app.use('/Admin', require('./Routes/Admin'));
app.use('/Emp', require('./Routes/Employee'));



const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server is running on port 5000");
})