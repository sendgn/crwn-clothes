import { createSelector } from 'reselect';

// Get only categories slice of a global app state
const selectCategoriesReducer = (state) => state.categories;

// Memoized selector for the whole categories slice
export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
);

// Memoized selector for the categories map
// That means - don't do reduce() if categories array is still the same
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);
