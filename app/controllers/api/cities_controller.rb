class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
  end

  def show
    @city = City.includes(:restaurants).includes(:ratings).includes(:photos).find(params[:id])
    render "api/cities/show"
  end
end
