Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  get '/api/charts/shared', to: 'api/charts#shared', defaults: {format: :json}
  get '/api/charts/shared/:id', to: 'api/charts#shared_show', defaults: {format: :json}
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :data_tables, only: [:create,:show,:index,:destroy]
    resources :charts, only: [:create,:show,:index,:destroy, :update]
  end

end
