# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[destroy update]

  def index
    @redirections = Redirection.all
    render
  end

  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
    render status: :ok, json: { message: "Redirection is created successfully." }
  end

  def destroy
    @redirection.destroy!
    render status: :ok, json: { message: "Redirection is deleted successfully." }
  end

  def update
    @redirection.update!(redirection_params)
    render status: :ok, json: { message: "Redirection is updated successfully." }
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection!
      @redirection = Redirection.find(params[:id])
    end
end
