import { createAction } from "../../utils/reducer/reducer-utils";
import { USER_ACTION_TYPES } from "./user-types";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const startGoogleSignIn = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);

export const startEmailSignIn = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, { email, password });

export const setSignInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.USER_SIGNIN_SUCCESS, user);

export const setSignInFail = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGNIN_FAIL, error);

export const setSignUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.USER_SIGNUP_START, {
    email,
    password,
    displayName,
  });

export const setSignUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.USER_SIGNUP_SUCCESS, {
    user,
    additionalDetails,
  });

export const setSignUpFail = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGNUP_FAIL, error);

export const setSignOutStart = () =>
  createAction(USER_ACTION_TYPES.USER_SIGNOUT_START);

export const setSignOutSuccess = () =>
  createAction(USER_ACTION_TYPES.USER_SIGNOUT_SUCCESS);

export const setSignOutFail = (error) =>
  createAction(USER_ACTION_TYPES.USER_SIGNOUT_FAIL, error);
