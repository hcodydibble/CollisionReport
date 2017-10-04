'use strict';

const EXPRESS = require('express');
const MAILER = require('nodemailer');
const PARSER = require('body-parser');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const TRANSPORTER = MAILER.createTransport({
  service: 'gmail',
  auth: {
    user: 'reportmywreck@gmail.com',
    pass: 'assword1'
  }
})

APP.use(EXPRESS.static('public'));
APP.use(PARSER.urlencoded({ extended: false }))
APP.use(PARSER.json())

APP.post('/mail',function(req){
  console.log(req.body)
  TRANSPORTER.sendMail(req.body,function(error,info){
    if(error){
      console.log(error)
    }else{
      console.log('Email sent: ' + info.response)
    }
  })
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

APP.listen(PORT, () => console.log(`Express server is currently running on port ${PORT}`))
