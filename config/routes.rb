# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do
    resources :articles, only: %i[index create destroy show], param: :slug
    resources :articles, only: :update, param: :slug do
      collection do
        put "bulk_update"
      end
    end
    resources :categories, only: %i[index create destroy]
    resources :categories, only: :update do
      member do
        put "position_update"
      end
    end
    resources :sites, only: %i[index update]
    resources :redirections, only: %i[index create destroy update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
