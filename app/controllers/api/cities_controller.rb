class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  def show
    @city = City.find_city(params[:id])
    render "api/cities/show"
  end
end
