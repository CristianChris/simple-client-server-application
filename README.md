###Server specification:
* After a client has been successful connected to the server, server will print the address and the port of the client.
* Server can process 5 different commands:
1. %Hastalavista - if the server receives this command, it will terminate the connection and shut itself down;
2. %Time - the server will react by sending the client the current time of the system on which the server is running
3. %Weather [City name (Chisinau or Prague)] - the server will react by sending the client the current weather forecast using https://developer.forecast.io/ API
4. %Quote - the server will react by sending the client a random quote back.
5. %Random [range (10 or 100)] - the server will react by sending back to the client a random number. We can choose to be from 1-10 or from 1-100.
* If the server receives an unknown command - it responds with "Can you elaborate on that?”.
* If the server receives an unknown command that ends with a '?' - it respond with “42”.
* The server is be able to handle multiple client connections at the 		same time. It prints the message that comes from each client specifying its address and port.
* The server supports an additional special command - %Showtime. 	Upon receiving it, the server sends the Terminators image of Arnold 	Schwarzenegger back to the client.

###Client specification:
* The client takes its input commands from the keyboard.
* The command is be sent to the server by pressing the Enter key.
* The client receives the image that is send by the server as a consequence of writing the command %Showtime and saves it in the current directory.
* The client terminates the connection with the server if you try to send the %Close command.

####Modules I’ve used:

* net-  The net module provides us with an asynchronous network wrapper. It contains functions for creating both servers and clients (called streams).
* fs- stands for FileSystem, it’s one of the most important module of NodeJS, All the methods have asynchronous and synchronous forms. In our case we use only asynchronous one for reading and writing data(the image).
* forecast- The aim of this module is to provide a common API for multiple weather providers and to return the results as a normalised Object.
