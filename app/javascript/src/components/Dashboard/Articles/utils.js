export const convertArticleToFormFormat = article => ({
  title: article.title,
  body: article.body,
  category_id: article.category_id,
  status: article.status,
});
