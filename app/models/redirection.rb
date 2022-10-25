# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validates :to, presence: true
  validate :to_and_from_not_equal, :check_redirection_loop

  private

    def to_and_from_not_equal
      if self.to == self.from
        errors.add(t("redirection_loop"))
      end
    end

    def check_redirection_loop
      if to_exist_in_from? && from_exist_in_to?
        errors.add(t("redirection_loop"))
      end
    end

    def to_exist_in_from?
      Redirection.where(to: self.from).present?
    end

    def from_exist_in_to?
      Redirection.where(from: self.to).present?
    end
end
