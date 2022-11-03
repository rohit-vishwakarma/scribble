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
      activeStatus: "All",
    });
  } else {
    setFilterOptions({
      ...filterOptions,
      categoryIds: [...filterOptions.categoryIds, category.id],
      activeStatus: "All",
    });
  }
};

export const countArticlesAccordingToStatus = (
  articles,
  setArticlesStatusCount
) => {
  const allCount = articles.length;
  const draftCount = articles.filter(
    article => article.status === "Draft"
  ).length;
  const publishedCount = articles.filter(
    article => article.status === "Published"
  ).length;

  setArticlesStatusCount({
    all: allCount,
    draft: draftCount,
    published: publishedCount,
  });
};
