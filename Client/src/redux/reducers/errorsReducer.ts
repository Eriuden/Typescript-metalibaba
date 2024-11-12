import { GET_ARTICLE_ERROR } from "../actions/article.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = {userError : [], articleError : []}

export const errorReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_ARTICLE_ERROR:
            return {
                articleError: action.payload
            }
        case GET_USER_ERRORS:
            return {
                userError: action.payload 
            }    
        default:
            return state
    }
}