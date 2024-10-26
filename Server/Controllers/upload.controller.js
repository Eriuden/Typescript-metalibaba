const userModel = require("../Models/user.model")
const articleModel = require("../Models/article.model")
const fs = require("fs")
const {promisify} = require("util")
const pipeline = promisify(require("stream").pipeline)
const {uploadErrors} = require("../utils/error.utils")

module.exports.uploadProfil = async (req,res) => {
    try {
        if(
            req.file.detectedMimeType != "image/jpg"
        &&  req.file.detectedMimeType != "image/png"
        &&  req.file.detectedMimeType != "image/jpeg"
        )
            throw Errors ("Fichier invalide")

        if(req.file.size > 500000) throw Error("taille maximale dépassée")
    } catch (error) {
        const errors = uploadErrors(error)
        return res.status(201).json({errors})
    }

    const fileName = req.body.name + ".jpg"

    await pipeline(
        req.body.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/userImages/${fileName}`
        )
    )

    try {
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {$set : { picture:"./uploads/userImage/" + fileName}},
            {new : true, upsert: true, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(500).send({message: err}) 
            }
        )
    } catch (error) {
        return res.status(500).send({message: err})
    }
}

module.exports.uploadArticlePic = async (req,res) => {
    try {
        if(
            req.file.detectedMimeType != "image/jpg"
        &&  req.file.detectedMimeType != "image/png"
        &&  req.file.detectedMimeType != "image/jpeg"
        )
            throw Errors ("Fichier invalide")

        if(req.file.size > 500000) throw Error("taille maximale dépassée")
    } catch (error) {
        const errors = uploadErrors(error)
        return res.status(201).json({errors})
    }

    const fileName = req.body.name + ".jpg"

    await pipeline(
        req.body.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/articleImages/${fileName}`
        )
    )

    try {
        await articleModel.findByIdAndUpdate(
            req.body.articleId,
            {$set : { picture:"./uploads/articleImages/" + fileName}},
            {new : true, upsert: true, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(500).send({message: err}) 
            }
        )
    } catch (error) {
        return res.status(500).send({message: err})
    }
}