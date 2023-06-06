import { USER_ACTION_TYPES } from "./user-types";

const USER_INITIAL_STATE = {
    currentUser: null,
}

// another way of [state, setState] but reduce on calling many setters
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    console.log(action)
    switch(type){
        case USER_ACTION_TYPES.SET_USER:
            return {...state, currentUser: payload}
        default:
            return state
    }
}