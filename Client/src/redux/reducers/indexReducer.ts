import { combineReducers } from "redux";
import { allArticleReducer } from "./allArticleReducer";
import { allUsersReducer } from "./allUsersReducer";
import { articleReducer } from "./articleReducer";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errorsReducer";
import { cartReducer } from "./cartReducer";

export const reducers = combineReducers({
    allArticleReducer,
    allUsersReducer,
    articleReducer,
    userReducer,
    errorReducer,
    cartReducer
})