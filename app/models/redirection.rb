# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, presence: true, uniqueness: true
  validates :to, presence: true
  validate :check_redirection_loop

  private

    def check_redirection_loop
      if self.to == self.from
        errors.add(:redirection, t("redirection.equal_path"))
      elsif is_redirection_cycle_present?
        errors.add(:redirection, t("redirection.redirection_loop"))
      end
    end

    def is_redirection_cycle_present?
      is_cycle_present = true
      current_to = self.to

      while self.from != current_to
        if Redirection.where(from: current_to).present?
          current_to = Redirection.find_by!(from: current_to).to
        else
          is_cycle_present = false
          break
        end
      end

      is_cycle_present
    end
end
