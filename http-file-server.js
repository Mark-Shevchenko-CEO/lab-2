const http = require('http');
const fs = require('fs');

const port = process.argv[2];
const filePath = process.argv[3];

if (!port || !filePath) {
  console.error('Usage: node server.js <port> <file>');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Set basic headers (optional but good practice)
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Create a readable stream
  const stream = fs.createReadStream(filePath);

  // Handle errors
  stream.on('error', (err) => {
    res.writeHead(500);
    res.end('Server Error');
  });

  // Pipe file stream to response
  stream.pipe(res);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});