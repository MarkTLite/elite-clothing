import { USER_ACTION_TYPES } from "./user-types";

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// another way of [state, setState] but reduce on calling many setters
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.USER_SIGNIN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.USER_SIGNOUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.USER_SIGNIN_FAIL:
    case USER_ACTION_TYPES.USER_SIGNUP_FAIL:
    case USER_ACTION_TYPES.USER_SIGNOUT_FAIL:
      alert(payload);
      return { ...state, error: payload };
    default:
      return state;
  }
};
