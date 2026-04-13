const http = require('http');

const port = process.argv[2];

if (!port) {
  console.error('Usage: node http-uppercaserer.js <port>');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Only POST requests are allowed');
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const uppercased = body.toUpperCase();

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(uppercased);
  });

  req.on('error', () => {
    res.writeHead(500);
    res.end('Server Error');
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});