# frozen_string_literal: true

class Api::Public::CategoriesController < ApplicationController
  before_action :current_user!, only: :index

  def index
    @categories = @_current_user.categories.order("position ASC")
    render
  end
end
