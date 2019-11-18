var http = require('http');
const fs = require('fs');
const moment = require('moment');
const os = require("os");

http
  .createServer(function(request, response) {
    let ip = request.connection.remoteAddress;
    let now = moment().format('MMMM Do YYYY, h:mm:ss a');


    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<p> Hola estas accediendo desde la ip: ' + ip  +'</p><p> La hora actual es: ' + now + "</p> <p>El servidor es: " + os.hostname() + "</p>" );


    fs.appendFileSync('/data/data.json', `{"hora" :` + now + `, "ip" : ` + ip + `},`);
    response.write(fs.readFileSync('/data/data.json'));

    response.end();
  })
  .listen(8080);
