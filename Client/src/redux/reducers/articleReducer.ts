import {GET_ARTICLE, UPDATE_ARTICLE, UPLOAD_ARTICLE_PICTURE, DELETE_ARTICLE,
    LIKE_ARTICLE, UNLIKE_ARTICLE, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE,
   EDIT_COMMENT, DELETE_COMMENT} 
   from "../actions/article.actions";
   
   const initialState:any = {}
   
   export const articleReducer = (state = initialState, action: any ) => {
       switch(action.type) {
           case GET_ARTICLE:
               return action.payload
           case UPDATE_ARTICLE:
               return state.map((article:any) => {
                   if (article.id === action.payload.articleId) {
                       return {
                           ...article,
                           name: action.payload.name,
                           typeArticle: action.payload.typeArticle,
                           groupe: action.payload.groupe,
                           price: action.payload.price
                       }
                   } else return article
               })
           case UPLOAD_ARTICLE_PICTURE:
               return state.map((article:any)=> {
                   if (article.id === action.payload.articleId) {
                       return {
                           picture: action.payload.picture
                       } 
                   } else return article
               })
           case DELETE_ARTICLE:
               return state.filter((article:any) => 
               article.id !== action.payload.articleId)
           case EDIT_COMMENT:
               return state.map((article:any) => {
                   if(article._id === action.payload.articleId) {
                       return {
                           ...article,
                           comments: article.comments.map((comment: any) => {
                               if (comment._id === action.payload.commentId) {
                                   return {
                                       ...comment,
                                       text: action.payload.text 
                                   }
                               } else {
                                   return comment
                               }
                           })
                       }
                   } else return article
               })
           case DELETE_COMMENT:
               return state.map((article:any) => {
                   if (article._id === action.payload.articleId) {
                       return {
                           ...article,
                           comments: article.comments.filter((comment:any) =>
                           comment._id !== action.payload.commentId)
                       }
                   } else return article
               })
           case LIKE_ARTICLE:
               return state.map((article:any) => {
                   if (article._id === action.payload.articleId)
                       return {
                           ...article,
                           likers: [action.payload.userId, ...article.likers]
                       }
               })
           case DISLIKE_ARTICLE:
               return state.map((article:any) => {
                   if (article._id === action.payload.articleId)
                       return {
                           ...article,
                           likers: [action.payload.userId, ...article.dislikers]
                       }
               })
           case UNLIKE_ARTICLE:
               return state.map((article:any) => {
                   if (article._id === action.payload.articleId)
                       return {
                           ...article,
                           likers: article.likers.filter((id:string) =>
                           id !== action.payload.userId)
                       }
                   return article
               })
           case UNDISLIKE_ARTICLE:
               return state.map((article:any) => {
                   if (article._id === action.payload.articleId)
                       return {
                           ...article,
                           dislikers: article.dislikers.filter((id:string) => 
                           id !== action.payload.userId)
                       }
                   return article
               })   
           default:
               return state          
       }
   }