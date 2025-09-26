import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Invalid request',
      details: err.flatten(),
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: 'Unknown error occurred',
  });
};

