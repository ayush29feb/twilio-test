
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var xml = require('xml');

var app = express();
var client = require('twilio')('AC9f6f074a667db5b4dcc4d266b13137c2', '4ad97748c64ed6b6af5d9ac9c5e9d1f1');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/twilio', function(req, res){
	client.sendMessage({
	    to:'+12063932864', // Any number Twilio can deliver to
	    from: '+12532184206', // A number you bought from Twilio and can use for outbound communication
	    body: 'Okay. Thats good' // body of the SMS message
	}, function(err, responseData) { //this function is executed when a response is received from Twilio
	    if (!err) { // "err" is an error received during the request, if any
	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1
	        res.send({from : responseData.from, body : responseData.body });
	    } else {
	    	res.send({message : 'failed'});
	    }
	});
});

app.get('/twilio/reply', function(req, res, next){
	var resp = new twilio.TwimlResponse();

	resp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and node.js');
	res.writeHead(200, {
	res.writeHead(200, {
		'Content-Type':'text/xml'
	});
	res.end(resp.toString());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
