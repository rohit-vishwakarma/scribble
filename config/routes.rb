# frozen_string_literal: true

Rails.application.routes.draw do

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, only: %i[index create update destroy show], param: :slug
    resources :categories, only: %i[index create update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
