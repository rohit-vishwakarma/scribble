# frozen_string_literal: true

class Api::Admin::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[destroy update show versions]

  def index
    @articles = current_user.articles.order("updated_at DESC")
    @articles = ArticlesFilterService.new(
      @articles, params[:status],
      params[:category_ids], params[:search_term]).process
    render
  end

  def count
    @articles = current_user.articles
    if params[:category_ids].present?
      @articles = @articles.where(category_id: params[:category_ids].split(",").map(&:to_i))
    end
    render
  end

  def published_list
    @articles = current_user.articles.where(status: "Published").order("updated_at DESC").page(params[:page_number])
    render
  end

  def create
    current_user.articles.create! article_params
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

  def versions
    @article_versions = @article.versions
    render
  end

  private

    def article_params
      params.require(:article).permit(:title, :body, :category_id, :status, :version_status, :restored_at)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
