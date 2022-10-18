# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site!, only: %i[index update]

  def index
    render
  end

  def create
    @site = Site.first
    unless @site.authenticate(params[:password])
      render status: :unauthorized, json: { message: "Wrong password." }
    end
  end

  def update
    @site.name = params[:name]
    @site.password = params[:password]
    @site.save!
    respond_with_success(t("successfully_updated", entity: Site))
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end

    def load_site!
      @site = Site.first
    end
end
