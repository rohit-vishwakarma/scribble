# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NAME_LENGTH = 60

  acts_as_list scope: :user

  has_many :articles
  belongs_to :user

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_NAME_LENGTH }
end
