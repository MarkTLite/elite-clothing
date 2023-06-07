import { createSelector } from "reselect";

/*
Memoize because all selectors get called when the root reducer changes
despite the reducer not changing
*/
const selectCategoryReducer = (state) => state.categories;

//Is it the same category reducer object in the root reducer?
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (newCatReducer) => newCatReducer.categoriesList
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (newCategoriesList) => {
    return newCategoriesList.reduce((final, docSnap) => {
      const { title, items } = docSnap;
      final[title.toLowerCase()] = items;
      return final;
    }, {});
  }
);
