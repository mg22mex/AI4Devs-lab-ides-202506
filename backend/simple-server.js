const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'ATS Backend is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Test endpoint
app.get('/api/v1/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Backend is running successfully!',
    timestamp: new Date().toISOString(),
    note: 'This is a simplified version for testing'
  });
});

// Candidates endpoint
app.get('/api/v1/candidates', (req, res) => {
  res.json({
    status: 'success',
    message: 'Candidates endpoint - Backend is working!',
    data: [],
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
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/v1/test`);
  console.log(`👥 Candidates endpoint: http://localhost:${PORT}/api/v1/candidates`);
});
