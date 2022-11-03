# frozen_string_literal: true

class Api::Admin::ArticlesFilterService
  attr_reader :articles, :status, :category_ids, :search_term

  def initialize(articles, status, category_ids, search_term)
    @articles = articles
    @status = status
    @category_ids = category_ids
    @search_term = search_term
  end

  def process
    if status.present? && status != "All"
      @articles = articles.where({ status: status })
    end

    if category_ids.present?
      @articles = articles.where(category_id: category_ids.split(",").map(&:to_i))
    end

    @articles = articles.where("title LIKE ?", "%#{search_term}%")
  end
end
