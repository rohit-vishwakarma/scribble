# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, only: %i[update destroy position_update]

  def index
    @categories = Category.all.order("position ASC")
    render
  end

  def create
    category = Category.new(category_params)
    if category.save!
      respond_with_success(t("successfully_created", entity: Category))
   else
     respond_with_error(t("unprocessable_entity", entity: Category))
    end
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: Category))
  end

  def destroy
    @category.destroy!
    respond_with_success(t("successfully_deleted", entity: Category))
  end

  def position_update
    @category.update!(position: params[:position])
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = Category.find(params[:id])
    end
end
