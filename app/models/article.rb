# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :category

  validates :title, presence: true
  validates :status, presence: true
  validates :description, presence: true
end
