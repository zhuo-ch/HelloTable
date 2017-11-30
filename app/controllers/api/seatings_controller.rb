class Api::SeatingsController < ApplicationController
  def create
    @seating = Seating.new(seating_params)

    if @seating.save
      render 'api/seatings/show'
    else
      render json: @seating.errors.full_messages, status: 409
    end
  end

  def show
    @seating = Seating.find(params[:id])
    render 'api/seatings/show'
  end

  def search
    query = params[:query]
    time = query[:time].to_i
    @seatings = Seating.where(restaurant_id: query[:restaurantId]).where.not(id: (Seating.joins(:reservations)
      .where("reservations.date = ?", query[:date])
      .where("reservations.time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seats = ?", query[:seats])
      .where("seatings.restaurant_id = ?", query[:restaurantId])
      .references(:reservations, :seatings)
      .group(:id)
      .having("count(seatings.id) >= max_tables")))
debugger
    render 'api/seatings/search'
  end

  def update
    @seating = Seating.find(params[:id])

    if @seating.update(seating_params)
      render 'api/seatings/show'
    else
      render json: @seating.errors.full_messages, status: 422
    end
  end

  def destroy
    @seating = Seating.find(params["id"])
    Seating.destroy(params["id"])
    render 'api/seatings/show'
  end

  private
  def seating_params
    params.permit(:restaurant_id, :id, :seats, :max_tables)
  end
end
