import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors';
import messages from '../assets/json/messages.json';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  if (!req.route) {
    return next(new NotFoundError(messages.notFound));
  }
};

export default notFoundHandler;
