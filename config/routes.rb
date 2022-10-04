# frozen_string_literal: true

Rails.application.routes.draw do

  resources :articles, only: [:index, :create]
  resources :categories, only: [:index, :create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
