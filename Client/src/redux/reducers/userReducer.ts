import { GET_USER, DELETE_USER, UPDATE_USER, UPDATE_PASSWORD } from "../actions/user.actions";

const initialState:any = {}

export const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_USER:
            return action.payload
        
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                adress: action.payload.adress
            }
            
         case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload.password
            }
            
        case DELETE_USER:
            return state.filter((user:any) => user._id !== action.payload.userId)
                
        default: 
            return state
    }
}