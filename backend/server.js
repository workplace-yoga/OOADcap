const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/infrastructure/persistence/Database');
const errorHandler = require('./src/presentation/middleware/errorHandler');
const seedDatabase = require('./src/infrastructure/persistence/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Auto-seed if database empty
if (db.getTable('users').length === 0) {
  seedDatabase();
}

// CORS Configuration
app.use(cors({
  origin: '*', // Supports local testing & GitHub Pages
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// API Routes
app.use('/api/v1/auth', require('./src/presentation/routes/auth.routes'));
app.use('/api/v1/students', require('./src/presentation/routes/student.routes'));
app.use('/api/v1/faculty', require('./src/presentation/routes/faculty.routes'));
app.use('/api/v1/courses', require('./src/presentation/routes/course.routes'));
app.use('/api/v1/enrollments', require('./src/presentation/routes/enrollment.routes'));
app.use('/api/v1/attendance', require('./src/presentation/routes/attendance.routes'));
app.use('/api/v1/academic-records', require('./src/presentation/routes/academic.routes'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'Student Information System REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 SIS-OOAD REST API running on http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
    console.log(`====================================================`);
  });
}

module.exports = app;
