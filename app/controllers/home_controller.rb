# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirect, only: :index

  def index
    render
  end

  private

    def redirect
      from_path = request.path
      redirection = Redirection.find_by(from: from_path)
      redirect_to redirection.to if redirection != nil
    end
end
