class Api::FavoritesController < ApplicationController
  def show
    @restaurant = Restaurant
      .includes(:rating)
      .includes(:reviews)
      .includes(:photos)
      .find(params[:id])

    if @restaurant && logged_in?
      render 'api/manager/show'
    else
      render json: @restaurant.errors.full_messages
  end
end
