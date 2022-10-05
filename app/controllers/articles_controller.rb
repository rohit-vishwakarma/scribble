# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: :destroy

  def index
    articles = Category.joins(:articles)
      .select("articles.id, articles.title, articles.updated_at, categories.name as category_name, articles.status")
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "Your article is saved." }
  end

  def destroy
    @article.destroy!
    render status: :ok, json: { message: "Your article is deleted successfully." }
  end

  private

    def article_params
      params.require(:article).permit(:title, :description, :category_id, :status)
    end

    def load_article!
      @article = Article.find(params[:id])
    end
end
