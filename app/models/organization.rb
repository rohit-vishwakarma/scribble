# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_NAME_LENGTH = 50
  MIN_PASSWORD_LENGTH = 6
  PASSWORD_REGEX_FORMAT = /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/

  has_many :users
  has_many :redirections

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH },
    format: {
      with: PASSWORD_REGEX_FORMAT,
      message: "requires 1 letter and 1 number"
    }, if: -> { password.present? }

  has_secure_password validations: false
  has_secure_token :authentication_token
end
