# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :create_visit!, only: :show

  def index
    @articles = current_user!.articles.where(status: "Published").order("updated_at DESC")
    render
  end

  def show
    render
  end

  private

    def create_visit!
      @article = current_user!.articles.find_by!(slug: params[:slug])
      visit = @article.visits.create!(visit: 1)
    end
end
