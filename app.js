const cors = require('cors');
const express = require('express');

require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.json());

/* Routes */
var routes = require('./routes/api');

app.use('/api', routes);

var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log('Express server running in: \x1b[32m%s\x1b[0m', 'http://localhost:' + port + '/');
});