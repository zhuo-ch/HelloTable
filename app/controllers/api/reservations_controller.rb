class Api::ReservationsController < ApplicationController

  def search
    debugger
    if params[:query][:type] == "restaurant"
      @reservations = Restaurant.find(
        params[:query][:restaurantId]).get_reservations(params[:query][:date],
          params[:query][:time]).to_a
        render 'api/reservations/search'
    end
  end
end
