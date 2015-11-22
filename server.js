var net = require('net');
var fs = require('fs');
var Forecast = require('forecast');

// Initialize forecast API
var forecast = new Forecast({
  service: 'forecast.io',
  key: 'ddd0ceabfb177a7a21eb535b16cdb899',
  units: 'celcius',
});

var HOST = '127.0.0.1';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort+' at: '+getDateTime());

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('Message from: ' + sock.remoteAddress + ':' + sock.remotePort + ' : '+ data);
        // our If cases of proccesing the commands that comes from the client
        if (data == 'Showtime') {
            fs.readFile('./img/terminator.jpg','hex', function (err,data) {
              // Fail if the file can't be read.
              if (err) {
                return console.log(err);
              }
              sock.write(data)
        });
        } else if(data == 'Hastalavista'){
            sock.destroy();
        } else if(data =='Time'){
            sock.write(getDateTime());
        } else if(data =='Random 10'){
            var number10 = Math.floor(Math.random() * (10 - 1 +1) + 1)
            sock.write('Random number from 1 included to 10 included is: '+number10);
        } else if(data =='Random 100'){
            var number100 = Math.floor(Math.random() * (100 - 1 +1) + 1)
            sock.write('Random number from 1 included to 100 included is: '+number100);
        } else if(data =='Weather Chisinau'){
                // Retrieve weather information for Chisinau
                forecast.get([47.0104529, 28.86381030000007], true, function(err, weather) {
                  if(err) return console.dir(err);
                  sock.write('\n Timezone: '+weather.timezone+'\n Summary: '+weather.hourly.summary+'\n Currently: '+JSON.stringify(weather.currently));
                });
        } else if(data =='Weather Prague'){
                // Retrieve weather information for Prague
                forecast.get([50.0755381, 14.43780049999998], true, function(err, weather) {
                  if(err) return console.dir(err);
                  sock.write('\n Timezone: '+weather.timezone+'\n Summary: '+weather.hourly.summary+'\n Currently: '+JSON.stringify(weather.currently));
                });
        } else if(data =='Quote'){
            items = ['Everything that is done in the world is done by hope.','Morning without you is a dwindled dawn.','There is no prejudice that the work of art does not finally overcome.','Show me your garden and I shall tell you what you are.','The only thing wrong with immortality is that it tends to go on forever.']
            var quote = items[Math.floor(Math.random()*items.length)];
            sock.write(quote)
        } else {
            if (endsWith(data, '?')) {
                sock.write('42');
            } else {
                sock.write('Can you elaborate on that?');
            }
        }
    });
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

// Function that gets the current time and date and returns int in the formated format
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

// function that checks the end of the string if it match our suffix
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




