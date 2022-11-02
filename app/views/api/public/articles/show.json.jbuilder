# frozen_string_literal: true

json.extract! @article,
  :id,
  :title,
  :body,
  :slug,
  :updated_at,
  :visits

json.category @article.category, :id, :name
