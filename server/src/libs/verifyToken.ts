import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json('Access Denied');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || '');

    if (payload) {
      next();
    } else return res.status(401).json('Access Denied');
  } catch (e) {
    res.status(401).send('Invalid Token');
  }
};
