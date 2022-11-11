# frozen_string_literal: true

class CategoryDeletionService
  attr_reader :id, :new_category_id, :current_user

  def initialize(id, new_category_id, current_user)
    @id = id
    @new_category_id = new_category_id
    @current_user = current_user
  end

  def process
    if current_user.categories.count == 1 && current_user.categories.find(id).name == "General"
      return
    end

    if current_user.categories.count == 1
      category = current_user.categories.create!(name: "General")
      @new_category_id = category.id
    end

    update_articles_category_id
    destroy_category
  end

  def update_articles_category_id
    articles = current_user.articles.where(category_id: id)
    articles.update(category_id: @new_category_id)
  end

  def destroy_category
    category = current_user.categories.find(id)
    category.destroy!
  end
end
