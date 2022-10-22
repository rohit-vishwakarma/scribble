# frozen_string_literal: true

json.extract! @article, :id, :slug, :title, :body, :status
json.category @article.category, :id, :name
