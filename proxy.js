const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const proxyReq = protocol.request(parsedUrl, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Proxy server is running');
});
