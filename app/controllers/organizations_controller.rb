# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization!, only: %i[show create update]

  def show
    render
  end

  def create
    unless @organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credentials"), :unauthorized)
    end
  end

  def update
    @organization.name = params[:name]
    @organization.password = params[:password] if params[:password].present?
    @organization.is_password_protected = params[:is_password_protected]
    @organization.save!
    respond_with_success(t("successfully_updated", entity: Organization))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :is_password_protected)
    end

    def load_organization!
      @organization = Organization.first
    end
end
