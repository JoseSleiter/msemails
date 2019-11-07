const express = require('express');
const reportes = express.Router();
const ctrPDF= require('../controllers/controllerPDF')
const {asyncMiddleware} = require('../helpers/handlerError')
const {...middleware} = require('../helpers/middleware')

reportes
.post('/report/emails', asyncMiddleware(ctrPDF.emails))
.get('/report/download-pdf', asyncMiddleware(ctrPDF.download))
// .post('/registerUser',middleware.AuthorizatJWT, asyncMiddleware(ctrPDF.register))

module.exports = reportes;