# frozen_string_literal: true

Rails.application.routes.draw do

  defaults format: :json do
    resources :articles, except: %i[new edit], param: :id do
      collection do
        put "bulk_update"
      end
    end
    resources :categories, except: %i[new edit] do
      collection do
        put "position_update"
      end
    end
    resource :organization, only: %i[show update create]
    resources :redirections, except: %i[new edit]
    resource :user, only: :show
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
