Rails.application.routes.draw do
  root "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :restaurants, only: [:index, :create, :show, :update, :destroy] do
      get "search", on: :collection
    end
    resources :cities, only: [:index, :show]
  end
end
