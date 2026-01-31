#!/usr/bin/env node

/**
 * SSM Dashboard CORS Proxy Server
 * This proxy server handles CORS issues when accessing SSM endpoints
 * Maintains IBM security standards by not exposing credentials
 */

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PROXY_PORT = 8001;

// MIME types for static files
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// SSM Endpoints configuration
const SSM_ENDPOINTS = {
    '/api/core': 'https://ssm-core-prod.06f18550.public.multi-containers.ibm.com/check/sanity',
    '/api/trial': 'https://ssm-trial-prod.feab05c7.public.multi-containers.ibm.com/ssm-trial-prod/check/sanity',
    '/api/apiendpoint': 'https://ssm-apiendpoint-prod.06f18550.public.multi-containers.ibm.com/apiendpoint//sanity'
};

// Proxy request handler
function proxyRequest(targetUrl, res) {
    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'SSM-Dashboard/2.0',
            'Accept': 'application/json'
        },
        timeout: 10000
    };

    const startTime = Date.now();

    https.get(targetUrl, options, (proxyRes) => {
        let data = '';

        proxyRes.on('data', (chunk) => {
            data += chunk;
        });

        proxyRes.on('end', () => {
            const responseTime = Date.now() - startTime;
            
            // Add CORS headers
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Response-Time': `${responseTime}ms`
            });

            res.end(data);
        });
    }).on('error', (error) => {
        console.error(`Proxy error for ${targetUrl}:`, error.message);
        res.writeHead(503, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            error: 'Service Unavailable',
            message: error.message,
            timestamp: new Date().toISOString()
        }));
    }).on('timeout', () => {
        console.error(`Timeout for ${targetUrl}`);
        res.writeHead(504, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            error: 'Gateway Timeout',
            message: 'Request timeout',
            timestamp: new Date().toISOString()
        }));
    });
}

// Serve static files
function serveStaticFile(filePath, res) {
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

// Main server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // Handle API proxy requests
    if (pathname.startsWith('/api/')) {
        const targetUrl = SSM_ENDPOINTS[pathname];
        if (targetUrl) {
            console.log(`Proxying request: ${pathname} -> ${targetUrl}`);
            proxyRequest(targetUrl, res);
        } else {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ error: 'Endpoint not found' }));
        }
        return;
    }

    // Serve static files
    let filePath = '.' + pathname;
    if (filePath === './') {
        filePath = './index.html';
    }

    serveStaticFile(filePath, res);
});

// Start server
server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', '╔════════════════════════════════════════════════════════╗');
    console.log('\x1b[36m%s\x1b[0m', '║     SSM Dashboard with CORS Proxy Server              ║');
    console.log('\x1b[36m%s\x1b[0m', '╚════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('\x1b[32m%s\x1b[0m', '✓ Server running successfully');
    console.log('');
    console.log('\x1b[34m%s\x1b[0m', `📡 Dashboard: \x1b[33mhttp://localhost:${PORT}\x1b[0m`);
    console.log('\x1b[34m%s\x1b[0m', `🔄 Proxy API: \x1b[33mhttp://localhost:${PORT}/api/*\x1b[0m`);
    console.log('');
    console.log('\x1b[32m%s\x1b[0m', 'Press Ctrl+C to stop');
    console.log('');
});

// Handle server errors
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`\x1b[31mError: Port ${PORT} is already in use\x1b[0m`);
        console.log('Try a different port or stop the existing server');
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\x1b[33m%s\x1b[0m', '⚠️  Shutting down server...');
    server.close(() => {
        console.log('\x1b[32m%s\x1b[0m', '✓ Server stopped');
        process.exit(0);
    });
});

// Made with Bob
