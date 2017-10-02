'use strict';

const EXPRESS = require('express');
const PARSER = require('body-parser');
const FS = require('fs');
const REQUEST = require('request');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;

APP.use(EXPRESS.static('public'));

APP.post('/screenshot', function(req,res){
  REQUEST({
    url: 'https://apileap.com/api/screenshot/v1/urltoimage',
    encoding: 'binary',
    qs: {
      url: 'https://screen-shot-test.herokuapp.com/',
      access_key: '3165e1148d1e4e9fbe59b8ce6f0cd350'
    }
  }, function(error,response,body){
    console.log(body)
    FS.writeFile('public/img/test.jpeg', body, 'binary', function(err){console.log(err)});
  });
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

APP.listen(PORT, () => console.log(`Express server is currently running on port ${PORT}`))
