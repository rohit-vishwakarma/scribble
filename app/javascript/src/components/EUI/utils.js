export const setIndexOfSelectedCategory = (categories, setSelectedCategory) => {
  const currentPathSplitBySlash = window.location.pathname.split("/");
  const lastIndex = currentPathSplitBySlash.length - 1;
  const currentSlug = currentPathSplitBySlash[lastIndex];
  let isSlugFound = false;

  if (currentSlug !== "") {
    categories.forEach((category, idx) =>
      category.publishedArticles.filter(article => {
        const isSlugMatched = article.slug === currentSlug;
        if (isSlugMatched) {
          isSlugFound = true;
          setSelectedCategory(idx);
        }

        return isSlugMatched;
      })
    );
  }

  if (!isSlugFound && window.location.pathname !== "/public") {
    setSelectedCategory(-1);
  }
};

export const findDefaultPreviewPath = (
  categories,
  setDefaultPreviewPath,
  setSelectedCategory
) => {
  const defaultCategory = categories.find(
    category => category.publishedArticles.length !== 0
  );

  setDefaultPreviewPath(defaultCategory.publishedArticles[0].slug);
  setSelectedCategory(categories.indexOf(defaultCategory));
};
