Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # サンプル画面
      get 'sample/index', to: "sample#index"
      post 'sample/create'
    end
  end 

  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'user/index', to: "user#index"
      post 'user/create'
    end
  end

  # devise_for :header_classification_dicts
  namespace :api do
    namespace :v1 do
      get 'header_classification_dict/load', to: "header_classification_dict#load"
      post 'header_classification_dict/create'
      delete 'header_classification_dict/:id', to: 'header_classification_dict#destroy'
      put 'header_classification_dict/update/:id', to: 'header_classification_dict#update'
    end
  end

  get 'home/index'
  root 'home#index'
  get 'header_classification_dicts', to: "api/v1/header_classification_dict#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end