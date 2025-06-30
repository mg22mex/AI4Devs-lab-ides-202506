const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const status = 'OK';
  const timestamp = new Date().toISOString();
  const uptime = process.uptime();
  const environment = process.env.NODE_ENV || 'development';
  const version = '1.0.0';
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ATS Health Check</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
        .container { max-width: 480px; margin: 60px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px 24px; }
        h1 { color: #22223b; font-size: 2rem; margin-bottom: 0.5em; }
        .status { font-size: 1.2rem; margin-bottom: 1em; }
        .status-ok { color: #27ae60; font-weight: bold; }
        .meta { color: #555; font-size: 1rem; margin-bottom: 0.5em; }
        .ats-logo { font-weight: 700; color: #2d6cdf; letter-spacing: 1px; font-size: 1.3rem; margin-bottom: 0.5em; }
        .footer { margin-top: 2em; color: #aaa; font-size: 0.9em; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="ats-logo">ATS System Health</div>
        <h1>Health Check</h1>
        <div class="status status-ok">Status: ${status}</div>
        <div class="meta">Environment: <b>${environment}</b></div>
        <div class="meta">Uptime: <b>${Math.floor(uptime)}s</b></div>
        <div class="meta">Version: <b>${version}</b></div>
        <div class="meta">Timestamp: <b>${timestamp}</b></div>
        <div class="footer">&copy; ${new Date().getFullYear()} ATS Development Team</div>
      </div>
    </body>
    </html>
  `);
});

// API routes
const apiPrefix = '/api/v1';

// Test endpoint
app.get(`${apiPrefix}/test`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend is running successfully!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    note: 'Simple test server is working',
  });
});

// Candidate endpoints
app.get(`${apiPrefix}/candidates`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Candidates endpoint - Backend is working!',
    data: [],
    timestamp: new Date().toISOString(),
  });
});

app.post(`${apiPrefix}/candidates`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Candidates endpoint - Backend is working!',
    data: req.body,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}${apiPrefix}/test`);
  console.log(`👥 Candidates endpoint: http://localhost:${PORT}${apiPrefix}/candidates`);
});
