const nodemailer = require('nodemailer')
module.exports = {
    url: "mongodb+srv://akash:akash1234@cluster0.4ayge.mongodb.net/salesandservises?retryWrites=true&w=majority",
    sendgridapi: "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",
    transporter: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'saleandservises@gmail.com', // generated ethereal user
            pass: 'sale@123', // generated ethereal password
        },
    })
}
