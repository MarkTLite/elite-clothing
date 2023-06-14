import { takeLatest, put, call, all } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user-types";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase-utils";
import {
  setSignInFail,
  setSignInSuccess,
  setSignOutFail,
  setSignOutSuccess,
  setSignUpFail,
  setSignUpSuccess,
} from "./user-actions";

export function* getUserAuthSnapshot(userAuth, additionalInformation) {
  try {
    console.log("in saga");
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(
      setSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(setSignInFail(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getUserAuthSnapshot, userAuth);
  } catch (error) {
    yield put(setSignInFail(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getUserAuthSnapshot, user);
  } catch (error) {
    yield put(setSignInFail(error));
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getUserAuthSnapshot, user);
  } catch (error) {
    yield put(setSignInFail(error));
  }
}

export function* signUpStart({ payload: {email, password, displayName} }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    // failure will jump to catch
    yield put(setSignUpSuccess(user, displayName));
  } catch (error) {
    yield put(setSignUpFail(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getUserAuthSnapshot, user, additionalDetails);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(setSignOutSuccess());
  } catch (error) {
    yield put(setSignOutFail(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGNUP_START, signUpStart);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGNUP_SUCCESS, signInAfterSignUp);
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onStartGoogleSignIn() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onStartEmailSignIn() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, emailSignIn);
}

export function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPES.USER_SIGNOUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onStartEmailSignIn),
    call(onStartGoogleSignIn),
    call(onSignOut),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
