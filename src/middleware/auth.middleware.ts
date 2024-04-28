import { NextFunction, Request, Response } from 'express';
import messages from '../assets/json/messages.json';
import { AuthenticationError } from '../errors';
import { stringToObjectId } from '../utils';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session || !req.session.userId) {
      return next(new AuthenticationError(messages.auth.unauthorized));
    }

    const userId = stringToObjectId(req.session.userId);

    req.user = { id: userId };

    next();
  } catch (error) {
    return next(new AuthenticationError(messages.auth.unauthorized));
  }
};

export default requireAuth;
