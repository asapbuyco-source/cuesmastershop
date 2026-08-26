// Local dev server for the static site.
// Usage: node dev-server.js   ->   http://localhost:8787
// Emulates Vercel cleanUrls ( /products/aaa  ->  /products/aaa.html )
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = process.env.PORT || 8787;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.atom': 'application/atom+xml',
  '.oembed': 'application/json+oembed',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8'
};

function resolveToFile(p) {
  // Vercel cleanUrls semantics:
  //  - strip trailing slashes (trailingSlash: false)
  //  - extensionless paths try <path>.html, then <path>/index.html
  while (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p === '') p = '/';
  const candidates = [];
  if (path.extname(p)) {
    candidates.push(path.join(root, p));
  } else {
    if (p === '/') {
      candidates.push(path.join(root, 'index.html'));
    } else {
      candidates.push(path.join(root, p + '.html'));
      candidates.push(path.join(root, p, 'index.html'));
    }
  }
  for (const f of candidates) {
    const resolved = path.resolve(f);
    if (resolved !== root && !resolved.startsWith(root + path.sep)) continue;
    try {
      if (fs.statSync(resolved).isFile()) return resolved;
    } catch (e) { /* keep looking */ }
  }
  return null;
}

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = resolveToFile(p);
  if (!file) {
    fs.readFile(path.join(root, '404.html'), (e2, notFound) => {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(e2 ? '404 Not Found' : notFound);
    });
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => {
  console.log('Serving site at http://localhost:' + port + '  (Ctrl+C to stop)');
});
