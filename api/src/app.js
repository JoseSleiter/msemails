var express = require('express');
var app = express();
var {...handler} = require('./helpers/handlerError')
const cors = require('cors')
app.use(cors())

// Middleware
app.use( express.urlencoded({extended: false}))
app.use( express.json())
app.set('json spaces', 2)

// Routes
app.use('/api/', require('./routes/reportes'))

// Handling Errors
app.use(handler.handleAssertionError); // 400
app.use(handler.handleDatabaseError); // 503
app.use(handler.handleValidationsError); // 422
app.use(handler.clientErrorHandler) // 500

module.exports = app;