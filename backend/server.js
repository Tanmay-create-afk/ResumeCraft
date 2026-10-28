import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import resumeRoutes from './src/routes/resumeRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// 1. Security Headers via Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. Enable CORS with configurable origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman) or matching allowed list
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    credentials: true,
  })
);

// 3. Body parser with 10MB limit for base64 image avatars
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. NoSQL Query Injection Sanitization (strips '$' and '.' from user inputs)
app.use(mongoSanitize());

// 5. Rate Limiting Protection
// General API rate limit (300 requests / 15 mins)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api', generalLimiter);

// Strict Auth rate limit to prevent brute force password guessing (25 attempts / 15 mins)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts. Please try again in 15 minutes.' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    security: 'hardened',
    timestamp: new Date().toISOString(),
  });
});

// Mount application API routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Endpoint Not Found - ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

import { execSync } from 'child_process';

const PORT = process.env.PORT || 5000;

// Helper to automatically release port if occupied by a stale zombie process
const freePort = (port) => {
  try {
    if (process.platform === 'win32') {
      const stdout = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      const pids = new Set();
      stdout.trim().split('\n').forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5 && parts[1].endsWith(`:${port}`)) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0' && pid !== String(process.pid)) {
            pids.add(pid);
          }
        }
      });
      pids.forEach(pid => {
        console.log(`🧹 Releasing orphaned process (${pid}) on port ${port}...`);
        try { execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' }); } catch (_) {}
      });
    } else {
      execSync(`lsof -ti :${port} | xargs kill -9`, { stdio: 'ignore' });
    }
  } catch (_) {
    // Port was already free
  }
};

let server;

function startServer(port, retried = false) {
  server = app.listen(port, () => {
    console.log(`🚀 ResumeCraft Security-Hardened API Server running on http://localhost:${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (!retried) {
        console.warn(`⚠️ Port ${port} is in use. Automatically freeing port and retrying...`);
        freePort(port);
        setTimeout(() => {
          startServer(port, true);
        }, 500);
      } else {
        console.error(`❌ Port ${port} is still in use after auto-clean. Falling back or waiting.`);
      }
    } else {
      console.error('Server error:', err);
    }
  });
}

// Graceful shutdown handling for nodemon and process termination
const shutdown = (signal) => {
  if (server) {
    server.close(() => {
      if (signal === 'SIGUSR2') {
        process.kill(process.pid, 'SIGUSR2');
      } else {
        process.exit(0);
      }
    });
  } else {
    if (signal === 'SIGUSR2') {
      process.kill(process.pid, 'SIGUSR2');
    } else {
      process.exit(0);
    }
  }
};

process.once('SIGUSR2', () => shutdown('SIGUSR2'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer(PORT);
