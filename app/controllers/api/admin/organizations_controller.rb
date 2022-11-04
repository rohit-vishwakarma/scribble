# frozen_string_literal: true

class Api::Admin::OrganizationsController < ApplicationController
  before_action :current_organization!, only: %i[show create update]

  def show
    render
  end

  def create
    unless @_current_organization.authenticate(params[:password])
      respond_with_error(t("organization.incorrect_credentials"), :unauthorized)
    end
  end

  def update
    @_current_organization.name = params[:name]
    if params[:is_password_protected] != nil
      @_current_organization.password = params[:password]
      @_current_organization.is_password_protected = params[:is_password_protected]
    end
    @_current_organization.save!
    respond_with_success(t("successfully_updated", entity: "Organization"))
  end
end
