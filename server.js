const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const FILES_DIR = path.join(__dirname, 'files');

if (!fs.existsSync(FILES_DIR)) {
  fs.mkdirSync(FILES_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  if (pathname === '/create' && method === 'POST') {
    const filename = query.filename;
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const filePath = path.join(FILES_DIR, filename);
      fs.writeFile(filePath, body, (err) => {
        if (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ message: 'Error creating file', error: err.message }));
        } else {
          res.writeHead(201);
          res.end(JSON.stringify({ message: 'File created successfully', filename }));
        }
      });
    });
  } else if (pathname === '/read' && method === 'GET') {
    const filename = query.filename;
    const filePath = path.join(FILES_DIR, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'File not found', error: err.message }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'File read successfully', content: data }));
      }
    });
  } else if (pathname === '/delete' && method === 'DELETE') {
    const filename = query.filename;
    const filePath = path.join(FILES_DIR, filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'File not found', error: err.message }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'File deleted successfully', filename }));
      }
    });
  } else if (pathname === '/list' && method === 'GET') {
    fs.readdir(FILES_DIR, (err, files) => {
      if (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: 'Error listing files', error: err.message }));
      } else {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Files listed successfully', files }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('POST /create?filename=myFile.txt (send content in body)');
  console.log('GET /read?filename=myFile.txt');
  console.log('DELETE /delete?filename=myFile.txt');
  console.log('GET /list');
});

// Basic error handling for the server
server.on('error', (err) => {
  console.error('Server error:', err);
});
