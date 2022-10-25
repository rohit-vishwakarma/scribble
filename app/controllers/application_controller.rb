# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def load_organization!
      @current_organization = Organization.first
    end

    def current_user!
      load_organization!
      @_current_user ||= @current_organization.users.first
    end
end
