class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  def show
    @city = City.find_city(city_params)
    render "api/cities/show"
  end

  private
  def city_params
    params.permit(:id, :page, :per_page)
  end
end
