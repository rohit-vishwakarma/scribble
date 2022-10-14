# frozen_string_literal: true

class SitesController < ApplicationController
  before_action :load_site!, only: %i[index update]

  def index
    render
  end

  def update
    @site.update!(site_params)
    render status: :ok, json: { message: "Site is updated successfully." }
  end

  private

    def site_params
      params.require(:site).permit(:name, :password)
    end

    def load_site!
      @site = Site.first
    end
end
