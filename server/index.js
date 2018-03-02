'use strict'
const express = require('express');
const path = require('path');
const api = require('./api/api');
const app = express();
const port = process.env.PORT || 8080;

require('./middleware')(app, express);

app.use('/api', api);

// Catch-all for unknown routes - commonly used in React applications that use hash routing
app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log('listening on port ' + port);
});
