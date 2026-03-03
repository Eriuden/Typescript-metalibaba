import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/userModel";

const ObjectId = mongoose.Types.ObjectId;

interface UserParams {
  id: string;
}

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getUser = async (
  req: Request<UserParams>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateUser = async (
  req: Request<UserParams>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


export const deleteUser = async (
  req: Request<UserParams>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: `ID invalide: ${id}` });
    return;
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};