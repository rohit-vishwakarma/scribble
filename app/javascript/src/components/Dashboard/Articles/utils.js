export const convertArticleToFormFormat = article => ({
  id: article.id,
  title: article.title,
  body: article.body,
  category: { label: article.category.name, value: article.category.id },
  status: article.status,
  scheduledPublish: article.scheduled_publish,
  scheduledUnpublish: article.scheduled_unpublish,
});
