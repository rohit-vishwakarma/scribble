export const convertArticleToFormFormat = article => ({
  title: article.title,
  body: article.body,
  category: { label: article.category.name, value: article.category.id },
  status: article.status,
});
