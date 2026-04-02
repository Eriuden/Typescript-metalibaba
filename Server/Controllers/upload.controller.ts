import { Request, Response } from "express";
import userModel from "../Models/user.model";
import articleModel from "../Models/article.model";
import fs from "fs";
import { promisify } from "util";
import stream from "stream";
import { uploadErrors } from "../utils/error.utils";

const pipeline = promisify(stream.pipeline);

interface MulterFile {
  detectedMimeType?: string;
  size: number;
  stream: NodeJS.ReadableStream;
}

interface CustomRequest extends Request {
  file?: MulterFile;
}

const validateFile = (file?: MulterFile) => {
  if (!file) throw new Error("Fichier manquant");

  if (
    file.detectedMimeType !== "image/jpg" &&
    file.detectedMimeType !== "image/png" &&
    file.detectedMimeType !== "image/jpeg"
  ) {
    throw new Error("Fichier invalide");
  }

  if (file.size > 500000) {
    throw new Error("Taille maximale dépassée");
  }
};

export const uploadProfil = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    validateFile(req.file);
  } catch (error) {
    const errors = uploadErrors(error);
    return res.status(400).json({ errors });
  }

  const fileName = `${req.body.name}_${Date.now()}.jpg`;

  try {
    await pipeline(
      req.file!.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/userImages/${fileName}`
      )
    );

    const updatedUser = await userModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `./uploads/userImages/${fileName}`,
        },
      },
      { new: true }
    );

    return res.send(updatedUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const uploadArticlePic = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    validateFile(req.file);
  } catch (error) {
    const errors = uploadErrors(error);
    return res.status(400).json({ errors });
  }

  const fileName = `${req.body.name}_${Date.now()}.jpg`;

  try {
    await pipeline(
      req.file!.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/articleImages/${fileName}`
      )
    );

    const updatedArticle = await articleModel.findByIdAndUpdate(
      req.body.articleId,
      {
        $set: {
          picture: `./uploads/articleImages/${fileName}`,
        },
      },
      { new: true }
    );

    return res.send(updatedArticle);
  } catch (error) {
    return res.status(500).json({ error });
  }
};