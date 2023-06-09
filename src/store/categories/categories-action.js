import { createAction } from "../../utils/reducer/reducer-utils";
import { CATEGORY_ACTION_TYPES } from "./categories-types";
import {getCollectionAndDocs} from "../../utils/firebase/firebase-utils";

export const setFetchCategoriesStart = () =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, true);

export const setFetchCategoriesFail = (error) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL, error);

export const setFetchCategoriesSuccess = (categoriesList) =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesList);

export const setFetchCategoriesAsync = () => {
  return async (dispatch) => {
    dispatch(setFetchCategoriesStart());
    try {
      const categoriesList = await getCollectionAndDocs("products");
      dispatch(setFetchCategoriesSuccess(categoriesList));
    } catch (error) {
      dispatch(setFetchCategoriesFail(error));
    }
  };
};
