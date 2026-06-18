import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    service: 'veronika-backend',
    timestamp: new Date().toISOString(),
  });
});
