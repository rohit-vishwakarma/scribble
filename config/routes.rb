# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :articles, except: %i[new edit] do
      put "bulk_update", on: :collection
    end
    resources :articles, only: :index, param: :slug do
      get "show_by_slug", on: :member
    end
    resources :categories, except: %i[new edit show] do
      put "position_update", on: :collection
    end
    resource :organization, only: %i[show update create]
    resources :redirections, except: %i[new edit show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
