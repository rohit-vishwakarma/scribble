# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 60

  has_many :articles

  validates :name, presence: true, length: { maximum: MAX_CATEGORY_LENGTH }
end
