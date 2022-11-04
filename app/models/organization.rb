# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 50

  has_many :users
  has_many :redirections

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, length: { minimum: 6 },
    format: {
      with: /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
      message: "requires 1 letter and 1 number"
    }, if: -> { password.present? }

  has_secure_password validations: false
  has_secure_token :authentication_token
end
