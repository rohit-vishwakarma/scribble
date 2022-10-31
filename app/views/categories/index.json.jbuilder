# frozen_string_literal: true

json.array! @categories do | category |
  json.extract! category, :id, :name
  json.count category.articles.count
  json.articles category.articles.where(status: "Published").order("created_at ASC"), :title, :slug, :body
end
