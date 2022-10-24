# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 60

  has_many :articles
  belongs_to :user

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }

  before_create :set_position

  private

    def set_position
      last_position = Category.maximum(:position)
      self.position = last_position.nil? ? 0 : last_position + 1
    end
end
