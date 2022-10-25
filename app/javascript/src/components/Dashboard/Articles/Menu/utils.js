export const filterArticlesAccordingToCategories = (
  category,
  activeCategories,
  setActiveCategories,
  allArticles,
  setAllArticles
) => {
  if (activeCategories.includes(category.id)) {
    const filteredArticles = allArticles.selectedArticles.filter(
      article => article.category_id !== category.id
    );

    setActiveCategories(
      activeCategories.filter(categoryId => categoryId !== category.id)
    );

    if (activeCategories.length === 1) {
      setAllArticles({
        ...allArticles,
        selectedArticles: allArticles.articlesList,
        articlesTable: allArticles.articlesList,
      });
    } else {
      setAllArticles({
        ...allArticles,
        selectedArticles: filteredArticles,
        articlesTable: filteredArticles,
      });
    }
  } else {
    const filteredArticles = allArticles.articlesList.filter(
      article =>
        activeCategories.includes(article.category_id) ||
        article.category_id === category.id
    );

    setActiveCategories([...activeCategories, category.id]);
    setAllArticles({
      ...allArticles,
      selectedArticles: filteredArticles,
      articlesTable: filteredArticles,
    });
  }
};

export const filterArticlesAccordingToCategoriesAndStatus = (
  dataLabel,
  allArticles,
  setAllArticles,
  setActiveStatus,
  activeCategories
) => {
  if (dataLabel !== "All") {
    const filteredArticles = allArticles.selectedArticles.filter(
      article => article.status === dataLabel
    );
    setAllArticles({ ...allArticles, articlesTable: filteredArticles });
  } else if (activeCategories.length === 0) {
    setAllArticles({
      ...allArticles,
      selectedArticles: allArticles.articlesList,
      articlesTable: allArticles.articlesList,
    });
  } else {
    setAllArticles({
      ...allArticles,
      articlesTable: allArticles.selectedArticles,
    });
  }
  setActiveStatus(dataLabel);
};
