class Api::ManagerController < ApplicationController
  def show
    @restaurant = Restaurant.find_manager_restaurant(params[:id])

    if @restaurant && logged_in?
      render 'api/manager/show'
    else
      render json: @restaurant.errors.full_messages
    end
  end
end
