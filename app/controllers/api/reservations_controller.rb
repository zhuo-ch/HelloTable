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
    @reservations = Reservation
      .where("date = ?", params[:query][:date])
      .where("time > ?", params[:query][:time].to_i - 200)
      .where("time < ?", params[:query][:time].to_i + 200)
      .where("restaurant_id = ?", params[:query][:restaurantId])

    render 'api/reservations/search'
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
