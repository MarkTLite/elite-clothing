import { all, call, put, takeLatest } from "redux-saga/effects";
import { CATEGORY_ACTION_TYPES } from "./categories-types";
import { getCollectionAndDocs } from "../../utils/firebase/firebase-utils";
import {
  setFetchCategoriesFail,
  setFetchCategoriesSuccess,
} from "./categories-action";

export function* fetchCategoriesAsync() {
  try {
    const categoriesList = yield call(getCollectionAndDocs, "products");
    yield put(setFetchCategoriesSuccess(categoriesList));
  } catch (error) {
    yield put(setFetchCategoriesFail(error));
  }
}
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}
export function* categoriesSagas() {
  yield all([call(onFetchCategories)]);
}
