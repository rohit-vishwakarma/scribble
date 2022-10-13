# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: [:destroy, :update, :show]
  before_action :load_articles!, only: :bulk_update

  def index
    @articles = Article.all
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "Article is created successfully." }
  end

  def update
    @article.update!(article_params)
    render status: :ok, json: { message: "Article is updated successfully." }
  end

  def destroy
    @article.destroy!
    render status: :ok, json: { message: "Article is deleted successfully." }
  end

  def show
    render
  end

  def bulk_update
    @articles.update(category_id: params[:update_id])
    render status: :ok, json: { message: "Articles are updated successfully." }
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def load_articles!
      @articles = Article.all.where(category_id: params[:delete_id])
    end
end
