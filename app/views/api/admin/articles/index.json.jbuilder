# frozen_string_literal: true

json.articles @articles do | article |
  json.partial! "api/admin/articles/article", article: article
  json.author article.user, :name
end

json.published_articles @articles do | article |
  if article.status == "Published"
    json.partial! "api/admin/articles/article", article: article
  end
end
