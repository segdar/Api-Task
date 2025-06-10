import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
    return;
  });

  return;
}

export function generateToken(iduser:string) {
  return jwt.sign({ iduser }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
}       