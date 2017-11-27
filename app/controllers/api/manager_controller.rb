class Api::ManagerController < ApplicationController
  def show
    @restaurant = Restaurant
      .includes(:rating)
      .includes(:reviews)
      .includes(:photos)
      .find_by(user_id: params[:id])

    if @restaurant && logged_in?
      render 'api/manager/show'
    else
      render json: @restaurant.errors.full_messages
    end
  end
end
