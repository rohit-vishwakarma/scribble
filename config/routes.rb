# frozen_string_literal: true

Rails.application.routes.draw do

  resources :articles, only: %i[index create destroy update]
  resources :categories, only: %i[index create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
