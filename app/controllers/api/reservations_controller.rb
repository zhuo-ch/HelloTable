class Api::ReservationsController < ApplicationController

  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render 'api/reservations/show'
    else
      render json: {base: @reservation.errors.full_messages }, status: 422
    end
  end

  def search
    if params[:query][:type] == "restaurant"
      @reservations = Restaurant.find(
        params[:query][:restaurantId]).get_reservations(params[:query][:date],
          params[:query][:time]).to_a
        render 'api/reservations/search'
    end
  end

  private
  def reservation_params
    params.require(:reservation).permit(:user_id, :restaurant_id, :time, :date)
  end
end
