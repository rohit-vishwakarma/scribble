# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: [:destroy, :update, :show]

  def index
    @articles = Article.all
    render
  end

  def create
    article = Article.new(article_params)
    article.save!
    render status: :ok, json: { notice: "Your article is saved." }
  end

  def update
    @article.update!(article_params)
    render status: :ok, json: { message: "Your article is updated successfully." }
  end

  def destroy
    @article.destroy!
    render status: :ok, json: { message: "Your article is deleted successfully." }
  end

  def show
    render
  end

  private

    def article_params
      params.require(:article).permit(:title, :description, :category_id, :status)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
