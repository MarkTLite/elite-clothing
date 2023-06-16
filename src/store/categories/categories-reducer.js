import { createSlice } from "@reduxjs/toolkit";

const CATEGORY_INITIAL_STATE = {
  categoriesList: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState: CATEGORY_INITIAL_STATE,
  reducers: {
    setCategoriesMap(state, action) {
      state.categoriesList = action.payload;
    },
  },
});

export const { setCategoriesMap } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;

// export const categoryReducer = (
//   state = CATEGORY_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;
//   switch (type) {
//     case CATEGORY_ACTION_TYPES.SET_CATEGORY_MAP:
//       return { ...state, categoriesList: payload };

//     default:
//       return state;
//   }
// };
