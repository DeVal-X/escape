Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :games, only: %i[create new index show update ] do
    collection do
      get :join, to: "games#join"
    end
    resources :items, only: %i[create index show destroy]
  end
  get :scoreboard, to: "scoreboard#index"
  # Defines the root path route ("/")
  # root "articles#index"
end
