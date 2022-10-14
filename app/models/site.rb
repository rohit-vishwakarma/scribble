# frozen_string_literal: true

class Site < ApplicationRecord
  MAX_NAME_LENGTH = 50

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
end
