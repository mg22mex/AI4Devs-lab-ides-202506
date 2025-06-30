const http = require('http');
const PORT = process.env.PORT || 3010; // Correct port as per README
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Parse URL
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  
  // Route handling
  if (path === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      message: 'ATS Backend is running!',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      port: PORT,
      uptime: Math.floor(process.uptime()),
      version: '1.0.0'
    }));
  } else if (path === '/api/v1/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Backend is running successfully!',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      port: PORT,
      connections: {
        database: { status: 'pending', message: 'Database connection not yet configured' },
        redis: { status: 'pending', message: 'Redis connection not yet configured' }
      },
      note: 'Database and Redis connections will be configured in the next phase'
    }));
  } else if (path === '/api/v1/candidates') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Candidates endpoint - Backend is working!',
      data: [],
      timestamp: new Date().toISOString(),
    }));
  } else if (path === '/api/v1/candidates/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Candidates service is healthy',
      timestamp: new Date().toISOString(),
    }));
  } else if (path === '/api/v1/files/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Files service is healthy',
      timestamp: new Date().toISOString(),
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'error',
      message: `Route ${path} not found`,
    }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 ATS Server running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/v1/test`);
  console.log(`👥 Candidates endpoint: http://localhost:${PORT}/api/v1/candidates`);
  console.log(`📚 API docs: http://localhost:${PORT}/api-docs (coming soon)`);
});
