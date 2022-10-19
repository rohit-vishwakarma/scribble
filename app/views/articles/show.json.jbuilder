# frozen_string_literal: true

json.extract! @article,
  :id,
  :slug,
  :title,
  :body,
  :status,
  :category_id
