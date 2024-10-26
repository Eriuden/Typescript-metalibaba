const userModel = require("../Models/user.model")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.getAllUsers = async (res) => {
    const users = await userModel.find().select("-password")
    res.status(200).json(users)
}

module.exports.getUser = async (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    userModel.findById(req.params.id , (err,docs) => {
        if(!err) res.send(docs)
        else console.log("Id inconnue" + err)
    }).select("-password")
}

module.exports.updateUser = async (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    try {
        await userModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set : {
                    name: req.body.name,
                }
            },
            { new: true, upsert: false, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message : err})
            }
        )
    } catch (error) {
        return res.status(500).json({message: err})
    }
}

module.exports.deleteUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    try {
        await userModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: "Au revoir"})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}