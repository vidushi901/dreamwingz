const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const logger = require('morgan')
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require('ejs');
const { urlencoded } = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const {HOST} = require('./config/keys')
const {PORT} = require('./config/keys')
const {USER} = require('./config/keys')
const {PASS} = require('./config/keys')


const indexRouter = require('./routes/index');
const port =process.env.PORT ||  80;
const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRouter)
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));


// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/contactorg', (req, res) => {
  res.render('contact_org',{ msg: '' });
});


app.post('/contactorg', (req, res) => {
  const email=req.body.email;
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Contact Number: ${req.body.number}</li>
      <li>Organization: ${req.body.organization}</li>
      <li>Topic: ${req.body.info}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: USER, // generated ethereal user
      pass: PASS  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Admin" <dreamwingz@hotmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Contact Request', // Subject line
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact_org', { msg: 'Email has been sent' });
  });
});
app.get('/contact-student', (req, res) => {
  res.render('contact_student', { msg: '' });
});
app.post('/contact_student', (req, res) => {
  const email=req.body.email;
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Contact Number: ${req.body.number}</li>
      <li>Institute: ${req.body.institute}</li>
      <li>State: ${req.body.state}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: USER, // generated ethereal user
      pass: PASS  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Admin" <dreamwingz@hotmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Contact Request', // Subject line
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact_student', { msg: 'Email has been sent' });
  });
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

