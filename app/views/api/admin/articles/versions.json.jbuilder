# frozen_string_literal: true

json.article_versions @article_versions do | version |
  json.extract! version, :id, :object
end
