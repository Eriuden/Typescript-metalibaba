import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/userModel"

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as CustomJwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    res.locals.user = user;
    return next();

  } catch (error) {
    res.locals.user = null;
    res.cookie("jwt", "", { maxAge: 1 });
    return next();
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ message: "Non autorisé (pas de token)" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as CustomJwtPayload;

    //A améliorer
    (req as any).userId = decoded.id;

    next();

  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};