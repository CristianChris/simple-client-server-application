var net = require('net');
var fs = require('fs');


var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {
client.setEncoding('binary');
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // Reading the client's input from the console and sending them to the server
    process.stdout.write('Input your command:\n')
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (command) {
        command = command.toString().trim();
        if (command == 'close') {
            process.exit();
        }
        process.stdin.resume();
        client.write(command);
    });
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket (client)
client.on('data', function(data) {
    if (endsWith(data.toString(), 'ffd9')) {
    fs.writeFile("img.jpg", data, 'hex', function(err) {
        if(err)
          console.log(err);
        else
          console.log("The file was saved!");
      });
    } else {
        console.log('Message from the server : ' + data);
    }
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});

// function that checks the end of the string if it match our suffix
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}




