export const convertArticleToFormFormat = article => ({
  title: article.title,
  body: article.body,
  category_id: article.category_id,
  status: article.status,
});

export const searchArticlesByTitle = (articles, searchTerm) =>
  articles.filter(article =>
    article.title
      .toLowerCase()
      .replaceAll(" ", "")
      .includes(searchTerm.toLowerCase().replaceAll(" ", ""))
  );
