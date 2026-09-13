import { Router } from 'express';
import { healthRouter } from './health';
import { chatRouter } from './chat';

export const router = Router();

router.use('/health', healthRouter);
router.use('/chat', chatRouter);
