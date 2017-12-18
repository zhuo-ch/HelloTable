class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation
      .includes(:user)
      .where(date: params[:query][:date])
      .where(restaurant_id: params[:query][:id])
    render 'api/reservations/index'
  end

  def create
    @reservation = Reservation.new(reservation_params)
debugger
    if @reservation.save
      debugger
      render 'api/reservations/show'
    else
      render json: {base: @reservation.errors.full_messages }, status: 422
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
      .includes(:restaurants)
      .includes(:photos)
      .includes(:ratings)
  end

  def search
    query = params[:query]
    time = query[:time].to_i
    @reservations = Reservation.joins(:seating)
      .where("date = ?", query[:date])
      .where("time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seating_id = ?", query[:seats_id])
      .where("seatings.restaurant_id = ?", query[:restaurantId])
      .references(:seatings)

    render 'api/reservations/search'
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    render 'api/reservations/show'
  end

  private
  def reservation_params
    params.require(:reservation).permit(:user_id, :restaurant_id, :time, :date, :seating_id, :seats)
  end
end
