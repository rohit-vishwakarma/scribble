export const filterArticlesAccordingToCategories = (
  filterOptions,
  setFilterOptions,
  category
) => {
  if (filterOptions.categoryIds.includes(category.id)) {
    const filteredCategoryIds = filterOptions.categoryIds.filter(
      categoryId => categoryId !== category.id
    );

    setFilterOptions({
      ...filterOptions,
      categoryIds: filteredCategoryIds,
      pageNumber: 1,
    });
  } else {
    setFilterOptions({
      ...filterOptions,
      categoryIds: [...filterOptions.categoryIds, category.id],
      pageNumber: 1,
    });
  }
};
