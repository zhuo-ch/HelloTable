class Api::ReservationsController < ApplicationController
  def index
    @reservations = Reservation.find_all_reservations(
      params[:query][:date],
      params[:query][:id]
    )

    render 'api/reservations/index'
  end

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
    render 'api/reservations/show'
  end

  def search
    query = params[:query]
    time = query[:time].to_i
    @reservations = Reservation.search_reservations(
      query[:date],
      query[:time].to_i,
      query[:seats_id],
      query[:restaurant_id]
    )

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
