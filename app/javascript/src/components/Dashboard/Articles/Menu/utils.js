export const filterArticlesAccordingToCategory = (
  category,
  activeCategories,
  setActiveCategories,
  allArticles,
  setAllArticles,
  setActiveStatus
) => {
  if (activeCategories.includes(category.id)) {
    const filterSelectedCategory = allArticles.selected.filter(
      article => article.category_id !== category.id
    );

    setActiveCategories(
      activeCategories.filter(categoryId => categoryId !== category.id)
    );
    if (activeCategories.length === 1) {
      setAllArticles({
        ...allArticles,
        selected: allArticles.main,
        table: allArticles.main,
      });
    } else {
      setAllArticles({
        ...allArticles,
        selected: filterSelectedCategory,
        table: filterSelectedCategory,
      });
    }
  } else {
    const filterSelectedCategory = allArticles.main.filter(
      article =>
        activeCategories.includes(article.category_id) ||
        article.category_id === category.id
    );
    setActiveCategories([...activeCategories, category.id]);
    setAllArticles({
      ...allArticles,
      selected: filterSelectedCategory,
      table: filterSelectedCategory,
    });
  }
  setActiveStatus("All");
};

export const filterArticlesAccordingToStatus = (
  dataLabel,
  allArticles,
  setAllArticles,
  setActiveStatus,
  activeCategory
) => {
  if (dataLabel !== "All") {
    const filterSelectedArticles = allArticles.selected.filter(
      article => article.status === dataLabel
    );
    setAllArticles({ ...allArticles, table: filterSelectedArticles });
  } else if (activeCategory.length === 0) {
    setAllArticles({
      ...allArticles,
      selected: allArticles.main,
      table: allArticles.main,
    });
  } else {
    setAllArticles({
      ...allArticles,
      table: allArticles.selected,
    });
  }
  setActiveStatus(dataLabel);
};
