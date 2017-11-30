class Api::ReservationsController < ApplicationController

  def create
    @reservation = Reservation.new(reservation_params)
    seating = Seating.find_by_params(
      params["reservation"]["restaurant_id"],
      params["reservation"]["seats"])
    @reservation.seating_id = seating.first.id

    if @reservation.save
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
# Reservation.joins(:seating)
# .where("date = ?", query[:date])
# .where("seats = ?", 2)
# .where("seatings.restaurant_id = ?", 2)
# .references(:seatings)
  def search
    query = params[:query]
    time = query[:time].to_i
    @reservations = Reservation.joins(:seating)
      .where("date = ?", query[:date])
      .where("time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seats = ?", query[:seats])
      .where("seatings.restaurant_id = ?", query[:restaurantId])
      .references(:seatings)
debugger
    render 'api/reservations/search'
  end

  def destroy
    @reservation = Reservation.find(params[:id])
    @reservation.destroy
    render 'api/reservations/show'
  end

  private
  def reservation_params
    params.require(:reservation).permit(:user_id, :restaurant_id, :time, :date)
  end
end
