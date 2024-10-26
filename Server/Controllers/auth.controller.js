const userModel = require ("../Models/user.model")
const jwt = require("jsonwebtoken")
const {signInErrors, signUpErrors} = require("../utils/error.utils")
const bcrypt = require("bcrypt")

const maxAge = 3*24*60*60*3600

const createToken = (id) => {
    return jwt.sign({id}), process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    }
}

module.exports.signUp = async(req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await userModel.create({name, email, password})
        res.status(201).json({user: user._id})
    } catch (error) {
        const errors = signUpErrors(error)
        res.status(200).send({errors})
    }
}

module.exports.signIn = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    } catch (error) {
        const errors = signInErrors(error)
        res.status(200).send({errors})
    }
}

module.exports.logout = (res) => {
    res.cookie("jwt", {maxAge : 1})
    res.redirect("/")
}

module.exports.resetPasswordLink = async (req,res) => {
    const {email} = req.body.email

    if (!email){
        res.status(401).json({status: 401, message: "Veuillez entrer votre email"})
    }

    try {
        const userfind = await userModel.findOne({email:email})

        const token = jwt.sign({_id:userfind._id}, process.env.TOKEN_SECRET, {
            expiresIn:"900s"
        })

        const setUserToken = await userModel.findByIdAndUpdate({_id:userfind._id},
            {verifytoken:token}, {new:true})

            if (setUserToken) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Lien pour modifier votre mot de passe",
                    text: `Ce lien n'est valide que durant 15 minutes
                    ${process.env.CLIENT_URL}/forgotpassword/${userfind.id}/
                    ${setUserToken.verifytoken}`
                }

                transport.sendMail(mailOptions, (error,info) => {
                    if(error){
                        console.log("error", error)
                        res.status(401).json({status:401, 
                        message: "Le mail n'a pas été envoyé"})
                    } else {
                        console.log("Email envoyé", info.response)
                        res.status(201).json({status:201, 
                        message: "Email envoyé avec succés"})
                    }
                })
            }
    } catch (error) {
        res.status(401).json({status:401, message:"Utilisateur introuvable"})
    }
}

module.exports.forgotPasswordChecking = async (req,res) => {
    const {id,token} = req.params

    try {
        const validUser = await userModel.findOne({_id:id, verifytoken:token})
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if(validUser && verifyToken._id){
            res.status(201).json({status:201, validUser})
        } else {
            res.status(401).json({status:401, message:"Utilisateur introuvable"})
        }
    } catch (error) {
        res.status(401).json({status:401, error})
    }
}

module.exports.updatePassword = async(req,res) => {
    const {id,token} = req.params
    const {password} = req.body.password 

    try {
        const validUser = await userModel.findOne({_id:id, verifytoken:token})
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)
        
        if(validUser && verifyToken._id){
            const newPassword = await bcrypt.hash(password,15)
            const setNewPassword = await userModel.findByIdAndUpdate({_id:id},
            {password:newPassword})

            setNewPassword.save()
            res.status(201).json({status:201, setNewPassword})
        } else {
            res.status(401).json({status:401, message:"Utilisateur introuvable"})
        }
    } catch (error) {
        res.status(401).json({status:401, error})
    }
}