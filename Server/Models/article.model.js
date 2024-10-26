const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema(
    {
        picture: {
            type: String,
            required: true 
        },

        name: {
            type: String,
            trim: true,
            maxlength: 200,
            required: true,
        },

        typeArticle: {
            type: String,
            trim: true,
            maxlength: 20,
            required: true,
        },

        groupe: {
            type: String,
            trim: true,
            maxlength: 100,
            required: true,
        },

        price: {
            type: String,
            trim: true,
            max: 10,
            required: true,
        },

        comments: {
            type: [
                {
                    commenterId: String,
                    commenterName: String,
                    text: String,
                    timeStamp: Number,
                }
            ],
            required: true,
        },

        likers: {
            type: [String],
            required: true,
        },

        dislikers: {
            type: [String],
            required: true,
        }
    },
    {timestamps : true}
)

const articleModel = mongoose.model("article", articleSchema)
module.exports = articleModel