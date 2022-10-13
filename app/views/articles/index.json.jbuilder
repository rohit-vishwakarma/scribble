json.articles @articles do | article |
  json.extract! article, :id, :title, :body, :status, :category_id, :slug
  json.category article.category, :id, :name
  json.author article.user, :name
end
json.draft @articles.where(status: "Draft").count
json.published @articles.where(status: "Published").count
