import axios from "axios";

export const GET_USERS = "GET_USERS"

export const getUsers = (dispatch:any) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user`)
            .then((res)=> {
                dispatch({type: GET_USERS, payload: res.data})
            })
            .catch((err) => window.alert(err))
}