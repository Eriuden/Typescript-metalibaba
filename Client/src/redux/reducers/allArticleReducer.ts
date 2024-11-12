import { GET_ALL_ARTICLES } from "../actions/article.actions";

const initialState = {}

export const allArticleReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case GET_ALL_ARTICLES:
            return action.payload
        default:
            return state
    }
}