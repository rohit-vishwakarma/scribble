# frozen_string_literal: true

json.array! @categories do | category |
  json.extract! category, :id, :name
  json.count category.articles.count
  json.articles category.articles do |article|
    json.extract! article, :id, :title, :body, :status, :created_at
    json.author article.user, :name
  end
end
