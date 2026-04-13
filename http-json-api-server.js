const http = require('http');
const url = require('url');

const port = process.argv[2];

if (!port) {
  console.error('Usage: node http-json-api-server.js <port>');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Only GET requests allowed' }));
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const iso = parsedUrl.query.iso;

  if (!iso) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Missing iso parameter' }));
  }

  const date = new Date(iso);

  let result;

  if (pathname === '/api/parsetime') {
    result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  } else if (pathname === '/api/unixtime') {
    result = {
      unixtime: date.getTime()
    };
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Not found' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(result));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});