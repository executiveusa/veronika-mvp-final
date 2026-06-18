import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        role?: string;
      };
      token?: string;
    }
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('[Auth] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  try {
    // Use service role client to verify the user's JWT
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    // Attach user and token to request for downstream use
    req.user = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    };
    req.token = token;

    next();
  } catch (err) {
    console.error('[Auth] Token verification error:', err);
    res.status(401).json({ error: 'Token verification failed' });
  }
}
