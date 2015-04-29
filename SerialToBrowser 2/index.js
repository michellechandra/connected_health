/*
	Express.js Serial to Browser example
	Shows how to serve static pages along with a dynamic route
	which communicates with the serial port.
	in Express.js 4.0
	
	This has a RESTful interface.  The static index.html page
	will continally request /device/3, which will return the value from the 
	serial port.
	
	to start this:
	node index.js portname
	
	where portname is the name of your serial port
	
	created 10 Feb 2015
	by Tom Igoe
*/

var express = require('express');			// include express.js
var app = express();								// a local instance of it

var serialport = require("serialport");	// include the serialport library
var SerialPort  = serialport.SerialPort;	// make a local instance of serial
var portName = process.argv[2];				// get the port name from the command line
// xbee ports will be different so when run need to use xbee port (node index.js node-serial-port)

app.use(express.static('public'));			// use the /public directory for static files
	
// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, { 
	baudRate: 9600,
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

// when you get a response from the serial port, 
//write it out to the client: 

var arduinoStuff = '';
myPort.on('data', function(data) {
	//response(data);
	console.log(data);
	arduinoStuff = data;
});	

// this runs after the server successfully starts:
function serverStart() {
  var port = server.address().port;
  console.log('Server listening on port '+ port);
}

// this is the callback function for when the client
// requests a static file:
function serveFiles(request, response) {
  var options = {							// options for serving files
    root: __dirname + '/public/'		// root is the /public directory in the app directory
  };
  // get the file name from the request parameter:
  var fileName = request.params.name;
  // send the file:
  response.sendFile(fileName, options);
}

// get an analog reading from the serial port.
// This is a callback function for when the client requests /device/channel:
function getSensorReading(request, response) {
 response.send(arduinoStuff);
}

// start the server:
var server = app.listen(8010, serverStart);
// start the listeners for GET requests:
app.get('/files/:name', serveFiles);				// GET handler for all static files
app.get('/device', getSensorReading);	// GET handler for /device


