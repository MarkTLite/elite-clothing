import { CATEGORY_ACTION_TYPES } from "./categories-types";

const CATEGORY_INITIAL_STATE = {
  isLoading: false,
  error: null,
  categoriesList: [],
};

export const categoryReducer = (
  state = CATEGORY_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };

    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
      return { ...state, error: payload, isLoading: false};

    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categoriesList: payload, isLoading: false};

    default:
      return state;
  }
};
