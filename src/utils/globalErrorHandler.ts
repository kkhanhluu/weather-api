import { NextFunction, Request, Response } from 'express';
import { AppError } from '../components/core/types';

export function globalErrorHandler(error: unknown, _: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ code: error.codeString, message: error.message });
  }
  if (error instanceof Error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  next();
}
