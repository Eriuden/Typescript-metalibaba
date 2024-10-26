const mongoose = require("mongoose")
const {isEmail} = require("validator")
const bcrypt = require ("bcrypt")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 35,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
        },

        adress: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 300,
        },

        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },

        likes: {
            type: [String]
        },

        dislikes: {
            type: [String]
        },
    },
    {timestamps: true},
)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.static.login = async function(email,password) {
    const user = await this.findOne({email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error("Mot de passe incorrect")
    }
    throw Error ("Adresse mail incorrecte")
}

const userModel = mongoose.model("user", userSchema)
module.exports = userModel