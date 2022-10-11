# frozen_string_literal: true

Rails.application.routes.draw do

  constraints(lambda { |req| req.format == :json }) do
    resources :articles, only: %i[index create destroy show], param: :slug
    resources :articles, only: :update do
      collection do
        put "bulk_update"
      end
    end
    resources :categories, only: %i[index create update destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
