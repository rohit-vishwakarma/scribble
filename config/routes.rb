# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :admin do
        resources :articles, except: %i[new edit] do
          put "bulk_update", on: :collection
        end
        resources :categories, except: %i[new edit show] do
          put "position_update", on: :collection
        end
        resource :organization, only: %i[show update create]
        resources :redirections, except: %i[new edit show]
      end

      namespace :public do
        resources :articles, only: %i[index show], param: :slug
        resources :categories, only: :index
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
