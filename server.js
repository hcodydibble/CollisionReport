'use strict';

const EXPRESS = require('express');
const PARSER = require('body-parser');
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;

APP.use(EXPRESS.static('public'));

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

APP.listen(PORT, () => console.log(`Servere running on port ${PORT}`))
