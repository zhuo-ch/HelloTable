class Api::ReservationsController < ApplicationController

  def create
    @reservation = Reservation.new(reservation_params)
    if @reservation.save
      render 'api/reservations/show'
    else
      render json: {base: @reservation.errors.full_messages }, status: 422
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
  end

  def search
    if params[:query][:type] == "restaurant"
      @reservations = Restaurant.find(
        params[:query][:restaurantId]).get_reservations(params[:query][:date],
          params[:query][:time]).to_a
        render 'api/reservations/search'
    end
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    render 'api/reservations/show'
  end

  private
  def reservation_params
    params.require(:reservation).permit(:user_id, :restaurant_id, :time, :date, :seats)
  end
end
