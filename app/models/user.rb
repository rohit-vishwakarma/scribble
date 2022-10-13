# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 30

  has_many :articles

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true
end
