# frozen_string_literal: true

class Api::Public::ArticlesController < ApplicationController
  before_action :current_user!, only: :show
  before_action :update_visits!, only: :show

  def show
    render
  end

  private

    def update_visits!
      @article = @_current_user.articles.find_by!(slug: params[:slug])
      @article.visits = @article.visits + 1
      @article.save!
    end
end
