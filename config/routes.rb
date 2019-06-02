Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'vocas#index'
  get '*path', to: 'vocas#index'
  resources :vocas

end
