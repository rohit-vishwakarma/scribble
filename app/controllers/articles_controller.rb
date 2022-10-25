# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :current_user!, except: [:new, :edit]
  before_action :load_article!, only: [:destroy, :update, :show]
  before_action :load_articles!, only: :bulk_update

  def index
    @articles = @_current_user.articles.order("updated_at DESC")
    render
  end

  def create
    article = @_current_user.articles.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def show
    render
  end

  def bulk_update
    @articles.update(category_id: params[:new_id])
    respond_with_success(t("successfully_updated", entity: "Articles"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status)
    end

    def load_article!
      @article = @_current_user.articles.find(params[:id])
    end

    def load_articles!
      @articles = @_current_user.articles.where(category_id: params[:current_id])
    end
end
