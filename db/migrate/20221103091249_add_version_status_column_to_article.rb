# frozen_string_literal: true

class AddVersionStatusColumnToArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :version_status, :string
  end
end
