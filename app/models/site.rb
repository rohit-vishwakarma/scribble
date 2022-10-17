# frozen_string_literal: true

class Site < ApplicationRecord
  MAX_NAME_LENGTH = 50

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :password, length: { minimum: 6 },
    format: {
      with: /[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
      message: "requires 1 letter and 1 number"
    }, if: -> { password.present? }
end
