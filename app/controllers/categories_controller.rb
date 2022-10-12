# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: [:update, :destroy]

  def index
    @categories = Category.all
    render
  end

  def create
    category = Category.new(category_params)
    if category.save!
      render status: :ok, json: { message: "Category is created successfully." }
   else
     render status: :unprocessable_entity, json: { notice: "Category already exist" }
    end
  end

  def update
    @category.update!(category_params)
    render status: :ok, json: { message: "Your category is updated successfully." }
  end

  def destroy
    @category.destroy!
    render status: :ok, json: { message: "Category is deleted successfully." }
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = Category.find(params[:id])
    end
end
