import { CATEGORY_ACTION_TYPES } from "./categories-types";

const CATEGORY_INITIAL_STATE = {
    categoryMap: {},
}

export const categoryReducer = (state = CATEGORY_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type){
        case CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP:
            return {...state, categoryMap: payload}

        default:
            return state
    }
}