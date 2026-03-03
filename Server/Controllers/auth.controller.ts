import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { signInErrors, signUpErrors } from "../utils/errors.utils";

const maxAge = 3 * 24 * 60 * 60; // 3 jours en secondes

const createToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: maxAge,
    }
  );
};

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (
  req: Request<{}, {}, SignUpBody>,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({ user: user._id });

  } catch (err) {
    const errors = signUpErrors(err);
    res.status(400).json({ errors });
  }
};

interface SignInBody {
  email: string;
  password: string;
}

export const signIn = async (
  req: Request<{}, {}, SignInBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id.toString());

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: maxAge * 1000, // en millisecondes pour cookie
    });

    res.status(200).json({ user: user._id });

  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).json({ errors });
  }
};

export const logout = (
  req: Request,
  res: Response
): void => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
  });

  res.status(200).json({ message: "Déconnecté avec succès" });
};