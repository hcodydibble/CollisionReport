'use strict';

const EXPRESS = require('express');
const MAILER = require('nodemailer');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const TRANSPORTER = MAILER.createTransport({
  service: 'gmail',
  auth: {
    user: 'hcodydibble@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
})

APP.use(EXPRESS.static('public'));

APP.post('/mail',function(req,res){
  TRANSPORTER.sendMail(req,function(error,info){
    if(error){
      console.log(error)
    }else{
      console.log('Email sent: ' + info.response)
    }
  })
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

APP.listen(PORT, () => console.log(`Express server is currently running on port ${PORT}`))
