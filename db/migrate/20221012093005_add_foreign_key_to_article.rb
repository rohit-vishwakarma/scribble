# frozen_string_literal: true

class AddForeignKeyToArticle < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :articles, :categories, column: :category_id
  end
end
