import { Request, Response } from "express";
import articleModel from "../Models/article.model";
import userModel from "../Models/user.model";
import mongoose from "mongoose";
import fs from "fs";
import { promisify } from "util";
import stream from "stream";
import { uploadErrors } from "../utils/error.utils";

const ObjectId = mongoose.Types.ObjectId;
const pipeline = promisify(stream.pipeline);

interface MulterFile {
  detectedMimeType?: string;
  size: number;
  stream: NodeJS.ReadableStream;
}

interface CustomRequest extends Request {
  file?: MulterFile;
}

export const readArticle = async (_req: Request, res: Response) => {
  try {
    const docs = await articleModel.find().sort({ createdAt: -1 });
    res.send(docs);
  } catch (err) {
    console.log("Erreur de réception :", err);
    res.status(500).send(err);
  }
};

export const createArticle = async (
  req: CustomRequest,
  res: Response
) => {
  let fileName: string | undefined;

  if (req.file) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      ) {
        throw new Error("Invalid file");
      }

      if (req.file.size > 500000) {
        throw new Error("Taille maximale dépassée");
      }
    } catch (error) {
      const errors = uploadErrors(error);
      return res.status(400).json({ errors });
    }

    fileName = `${req.body._id}_${Date.now()}.jpg`;

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/articleImages/${fileName}`
      )
    );
  }

  try {
    const article = await articleModel.create({
      picture: fileName
        ? `./uploads/articleImages/${fileName}`
        : "",
      name: req.body.name,
      typeArticle: req.body.typeArticle,
      groupe: req.body.groupe,
      price: req.body.price,
    });

    return res.status(201).json(article);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id inconnue: " + req.params.id);
  }

  try {
    const updated = await articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          picture: req.body.picture,
          name: req.body.name,
          typeArticle: req.body.typeArticle,
          groupe: req.body.groupe,
          price: req.body.price,
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    console.log("Erreur update :", err);
    res.status(500).send(err);
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Id inconnue: " + req.params.id);
  }

  try {
    const deleted = await articleModel.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (err) {
    console.log("Erreur suppression :", err);
    res.status(500).send(err);
  }
};

export const likeArticle = async (req: Request, res: Response) => {
  try {
    await articleModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { likers: req.body.id },
    });

    const user = await userModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { likes: req.params.id } },
      { new: true }
    );

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const dislikeArticle = async (req: Request, res: Response) => {
  try {
    await articleModel.findByIdAndUpdate(req.params.id, {
      $addToSet: { dislikers: req.body.id },
    });

    const user = await userModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { dislikes: req.params.id } },
      { new: true }
    );

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const unlikeArticle = async (req: Request, res: Response) => {
  try {
    await articleModel.findByIdAndUpdate(req.params.id, {
      $pull: { likers: req.body.id },
    });

    const user = await userModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { likes: req.params.id } },
      { new: true }
    );

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const undislikeArticle = async (
  req: Request,
  res: Response
) => {
  try {
    await articleModel.findByIdAndUpdate(req.params.id, {
      $pull: { dislikers: req.body.id },
    });

    const user = await userModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { dislikes: req.params.id } },
      { new: true }
    );

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const commentArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterName: req.body.commenterName,
            text: req.body.text,
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const editCommentArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const doc = await articleModel.findById(req.params.id);

    if (!doc) return res.status(404).send("Article introuvable");

    const comment = doc.comments.find((c: any) =>
      c._id.equals(req.body.commentId)
    );

    if (!comment) {
      return res.status(404).send("Commentaire introuvable");
    }

    comment.text = req.body.text;

    await doc.save();

    res.send(doc);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteCommentArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await articleModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.body.commentId },
        },
      },
      { new: true }
    );

    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
};