import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { router } from './routes/index';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      const allowed = [
        FRONTEND_URL,
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
      ];
      if (allowed.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mount all API routes
app.use('/api', router);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  if (err.message.startsWith('CORS:')) {
    res.status(403).json({ error: err.message });
    return;
  }

  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' ? { details: err.message } : {}),
  });
});

app.listen(PORT, () => {
  console.log(`[Veronika Backend] Server running on port ${PORT}`);
  console.log(`[Veronika Backend] CORS allowed origin: ${FRONTEND_URL}`);
  console.log(`[Veronika Backend] Health check: http://localhost:${PORT}/api/health`);
});

export { app };
