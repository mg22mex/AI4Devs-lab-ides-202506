const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Create Express app
const app = express();

// Environment variables
const PORT = process.env.PORT || 3010; // Correct port as per README
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

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
  const environment = NODE_ENV;
  const version = process.env.npm_package_version || '1.0.0';
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ATS Health Check</title>
      <link rel="icon" href="https://cdn.jsdelivr.net/gh/swagger-api/swagger-ui@master/dist/favicon-32x32.png">
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
const apiPrefix = process.env.API_PREFIX || '/api/v1';

// Placeholder routes (will be replaced with proper domain routes)
app.get(`${apiPrefix}/candidates`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Candidates endpoint - Backend is working!',
    data: [],
    timestamp: new Date().toISOString(),
  });
});

app.get(`${apiPrefix}/candidates/health`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Candidates service is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get(`${apiPrefix}/files/health`, (req, res) => {
  res.json({
    status: 'success',
    message: 'Files service is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Test endpoint for frontend-backend-database connection
app.get(`${apiPrefix}/test`, async (req, res) => {
  try {
    // Test database connection (will be implemented when Prisma is set up)
    const dbStatus = { status: 'pending', message: 'Database connection not yet configured' };
    
    // Test Redis connection (will be implemented when Redis is set up)
    const redisStatus = { status: 'pending', message: 'Redis connection not yet configured' };
    
    res.json({
      status: 'success',
      message: 'Backend is running successfully!',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      port: PORT,
      connections: {
        database: dbStatus,
        redis: redisStatus,
      },
      note: 'Database and Redis connections will be configured in the next phase',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🧪 Test endpoint: http://localhost:${PORT}${apiPrefix}/test`);
      console.log(`👥 Candidates endpoint: http://localhost:${PORT}${apiPrefix}/candidates`);
      console.log(`📚 API docs: http://localhost:${PORT}/api-docs (coming soon)`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();
