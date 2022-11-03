# frozen_string_literal: true

json.article_versions @article_versions do | version |
  json.extract! version, :id, :object
  if version.object != nil && Category.where(id: version.object["category_id"]).present?
    json.category Category.find(version.object["category_id"])
  end
end
