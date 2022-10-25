# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :current_user!, except: %i[:new :edit :show]
  before_action :load_category!, only: %i[update destroy]

  def index
    @categories = @_current_user.categories.order("position ASC")
    render
  end

  def create
    category = @_current_user.categories.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def destroy
    @category.destroy!
    respond_with_success(t("successfully_deleted", entity: "Category"))
  end

  def position_update
    position = 1
    category_id_list = params[:category_ids]
    category_id_list.each do | id |
      category = Category.find(id)
      category.update!(position: position)
      position = position + 1
    end
    respond_with_success(t("position_updated", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category!
      @category = @_current_user.categories.find(params[:id])
    end
end
