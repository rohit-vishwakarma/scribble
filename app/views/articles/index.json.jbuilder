json.array! @articles do | article |
  json.extract! article, :id, :title, :description, :status, :category_id
  json.category article.category, :id, :name
end
