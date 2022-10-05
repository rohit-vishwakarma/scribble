export const convertArticleToFormFormat = article => ({
  title: article.title,
  description: article.description,
  category_id: article.category_id,
  status: article.status,
});
