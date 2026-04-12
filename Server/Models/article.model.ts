import { Schema, Document, model } from "mongoose"
const mongoose = require("mongoose")

export interface IArticle extends Document  {
    picture: string,
    name: string,
    typeArticle: string,
    groupe: string,
    price: string,
    comments : [
        commenterId: string,
        commenterName : string,
        text: string,
        timestamp: Number
  ],
    likers: [string],
    dislikers: [string]
}

const articleSchema= new Schema(
    {
        picture: {            
            required: true 
        },

        name: {            
            trim: true,
            maxlength: 200,
            required: true,
        },

        typeArticle: {            
            trim: true,
            maxlength: 20,
            required: true,
        },

        groupe: {            
            trim: true,
            maxlength: 100,
            required: true,
        },

        price: {           
            trim: true,
            max: 10,
            required: true,
        },

        comments: {
            required: true,
        },

        likers: {            
          required: true,
        },

        dislikers: {
            required: true,
        }
    },
    {timestamps : true}
)

const articleModel = model<IArticle>("article", articleSchema)
module.exports = articleModel