class Api::HoursController < ApplicationController
  def show
    @hour = Hour.find(params[:id])
    render 'api/hours/show'
  end

  def update
    @hour = Hour.find(params[:hour][:id])
debugger
    if @hour.update(hour_params)
      render 'api/hours/show'
    else
      render json: @hour.erros.full_messages
    end
  end

  private
  def hour_params
    params.require(:hour).permit(:id, :day, :open, :close, :restaurant_id)
  end
end
