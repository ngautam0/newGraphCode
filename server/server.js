
var app = require('./main');

app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port '+ server.address().port)
});
