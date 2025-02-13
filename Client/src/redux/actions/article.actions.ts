import axios from "axios";

export const GET_ARTICLE = "GET_ARTICLE"
export const GET_ALL_ARTICLES = "GET_ALL_ARTICLES"
export const GET_ARTICLE_ERROR = "GET_ARTICLE_ERROR"
export const ADD_ARTICLE = "ADD_ARTICLE"
export const UPDATE_ARTICLE = "UPDATE_ARTICLE"
export const UPLOAD_ARTICLE_PICTURE = "UPLOAD_ARTICLE_PICTURE"
export const DELETE_ARTICLE = "DELETE_ARTICLE"

export const LIKE_ARTICLE = "LIKE_ARTICLE"
export const UNLIKE_ARTICLE = "UNLIKE_ARTICLE"
export const DISLIKE_ARTICLE = "DISLIKE_ARTICLE"
export const UNDISLIKE_ARTICLE = "UNDISLIKE_ARTICLE"

export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

type articlesProps = {
    articleId: string,
    picture: string,
    name: string,
    typeArticle: string,
    groupe: string,
    price: string
    likers:[string],
    dislikers:[string],
}

type commentProps = {
    articleId: string,
    commentId: string,
    commenterId: string,
    commenterName: string,
    text: string
}

export const getAllArticles = (num:number, dispatch:any) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/article`)
            .then((res)=> {
                dispatch ({type: GET_ARTICLE, payload: num})
                dispatch({type:GET_ALL_ARTICLES, payload: res.data})
            })
            .catch((err) => window.alert(err))
}

export const getArticle = (dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/article/:id`)
            .then((res)=> {
                dispatch({type:GET_ARTICLE, payload:res.data})
            })
            .catch((err)=> window.alert(err))
}

export const addArticle = (data: any, dispatch:any) => {
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/article`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch({type: GET_ARTICLE_ERROR, payload: res.data.errors})
                } else {
                    dispatch ({type: GET_ARTICLE_ERROR, payload:""})
                }
            })
}

export const updateArticle = ({
    articleId,
    name,
    typeArticle,
    groupe,
    price
} : articlesProps , dispatch:any
) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/article/${articleId}`,
            data: { name, typeArticle, groupe, price},
        })
        .then(()=> {
            dispatch({
                type: UPDATE_ARTICLE,
                payload: {articleId, name, typeArticle, groupe, price}
            })
        })
        .catch((err)=> window.alert(err))
}

export const uploadPicture = (data: any, articleId: string , dispatch:any) => {
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/article/upload-articlePic`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch({type: GET_ARTICLE_ERROR, payload: res.data.errors})
                } else {
                    dispatch ({ type: GET_ARTICLE_ERROR, payload: ""})
                    return axios
                    .get(`${process.env.REACT_APP_API_URL}api/article/${articleId}`)
                    .then((res)=> {
                        dispatch({ type: UPLOAD_ARTICLE_PICTURE, payload: res.data.picture})
                    })
                }
            })
            .catch((err) => console.log(err))
}

export const deleteArticle = ({
    articleId, picture, name, typeArticle, groupe, price
} : articlesProps, dispatch:any) => {
        return axios ({
            method:"delete",
            url:`${process.env.REACT_APP_API_URL}api/article/${articleId}`,
            data: {picture, name, typeArticle, groupe, price}
        })
        .then(()=> {
            dispatch({type: DELETE_ARTICLE, payload: {articleId}})
        })
}

export const likeArticle = (articleId: string, userId: string) => {
    return (dispatch: any) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/article/like-article`+ articleId,
            data: {id:userId}
        })
        .then(()=> {
            dispatch({type: LIKE_ARTICLE, payload: {articleId, userId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const unlikeArticle = (articleId: string, userId: string) => {
    return (dispatch: any) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/article/unlike-article`+ articleId,
            data: {id:userId}
        })
        .then(()=> {
            dispatch({type: UNLIKE_ARTICLE, payload: {articleId, userId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const dislikeArticle = (articleId: string, userId: string) => {
    return (dispatch: any) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/article/dislike-article`+ articleId,
            data: {id:userId}
        })
        .then(()=> {
            dispatch({type: DISLIKE_ARTICLE, payload: {articleId, userId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const undislikeArticle = (articleId: string, userId: string) => {
    return (dispatch: any) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/article/undislike-article`+ articleId,
            data: {id:userId}
        })
        .then(()=> {
            dispatch({type: UNDISLIKE_ARTICLE, payload: {articleId, userId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const addCommentArticle = ({articleId, commenterId, text, commenterName}
    : commentProps) => {
    return async (dispatch: any) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/article/comment-article/${articleId}`,
            data: {commenterId, text, commenterName}
        })
        .then(()=> {
            dispatch({ type: ADD_COMMENT, payload: {articleId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const editCommentArticle = ({articleId, commentId, text} : commentProps) => {
    return async (dispatch: any) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/article/edit-comment-article/${articleId}`,
            data: { commentId, text}
        })
        .then(()=> {
            dispatch({ type: EDIT_COMMENT, payload: {articleId, commentId, text}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const deleteCommentArticle = ({articleId, commentId} : commentProps) => {
    return (dispatch: any) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/article/delete-comment-article/${articleId}`,
            data:{commentId},
        })
        .then(()=> {
            dispatch({ type: DELETE_COMMENT, payload: {articleId, commentId}})
        })
        .catch((err)=> window.alert(err))
    }
}



