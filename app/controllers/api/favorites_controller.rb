class Api::FavoritesController < ApplicationController

  def create
    @favorite = Favorite.new(favorite_params)

    if @favorite.save
      render "api/favorites/show"
    else
      render @favorite.errors.full_messages, status: 422
    end
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.destroy
    render 'api/favorites/show'
  end

  private
  def favorite_params
    params.require(:favorite).permit(:user_id, :restaurant_id)
  end
end
