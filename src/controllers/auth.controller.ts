import { NextFunction, Request, Response } from 'express';
import messages from '../assets/json/messages.json';
import { AuthenticationError } from '../errors';
import { UserService } from '../services';
import { IResponse } from '../types/common';
import { ILogin, IUser } from '../types/user';
import { asyncHandler, stringToObjectId } from '../utils';

// Check if user is user session is active and is not expired
export const checkSession = asyncHandler(
  async (req: Request<IUser>, res: Response) => {
    if (!req.session.userId) return;

    if (Number(req.session.cookie.originalMaxAge) <= 0) logout;

    const userId = stringToObjectId(req.session.userId);
    const user = await UserService.getUserInfo(userId);
    res.status(200).json({ authenticated: true, user });
  }
);

// Register new user
export const register = asyncHandler(
  async (req: Request<IUser>, res: Response<IResponse>) => {
    await UserService.register(req.body);

    return res
      .status(201)
      .json({ success: true, message: messages.auth.registered });
  }
);

// Login with email and password
export const login = asyncHandler(
  async (req: Request<ILogin>, res: Response) => {
    const user = await UserService.authenticate(req.body);

    req.session.userId = user._id.toString();
    const loggedInUser = await UserService.getUserInfo(user._id);

    return res.status(200).json({
      success: true,
      message: messages.auth.loggedIn,
      user: loggedInUser
    });
  }
);

// Send password reset email
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response<IResponse>) => {
    await UserService.sendPasswordResetEmail(req.body.email);

    return res.status(200).json({
      success: true,
      message: messages.auth.resetPassword
    });
  }
);

// Reset password
export const resetPassword = asyncHandler(
  async (req: Request, res: Response<IResponse>) => {
    const { token } = req.query;
    const { newPassword } = req.body;

    await UserService.resetPassword(token as string, newPassword);

    return res.status(200).json({
      success: true,
      message: messages.auth.successfullyResetPassword
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response<IResponse>, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) return next(new AuthenticationError(err.message));

      return res
        .status(200)
        .json({ success: true, message: messages.auth.loggedOut });
    });
  }
);
