import { NextFunction, Request, Response } from 'express';

export function notFoundHandler(_: Request, res: Response, __: NextFunction) {
  res.status(404).send({ message: 'Not found' });
}
