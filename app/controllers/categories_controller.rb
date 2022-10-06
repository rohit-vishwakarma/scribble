# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    category.save!
    render status: :ok, json: { message: "Category is created successfully." }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
