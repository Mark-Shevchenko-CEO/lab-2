var net = require('net');

var server = net.createServer(function(socket) {
  var now = new Date();

  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, '0');
  var day = String(now.getDate()).padStart(2, '0');
  var hour = String(now.getHours()).padStart(2, '0');
  var minute = String(now.getMinutes()).padStart(2, '0');

  socket.end(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + '\n');
});

server.listen(process.argv[2]);