# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable

  private

    def load_organization!
      @organization = Organization.first
    end

    def load_current_user!
      load_organization!
      @current_user = User.where(organization_id: @organization.id).first
    end
end
