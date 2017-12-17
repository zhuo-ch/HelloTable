class Api::RestaurantsController < ApplicationController
  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      @restaurant.set_address(format_address)
      if params[:imageFiles]
        params[:imageFiles].each do |image|
            @restaurant.photos.create(image: image)
        end
      end

      render 'api/restaurants/show'
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def show
    @restaurant = Restaurant.includes(:rating, :reviews, :photos, :seatings).find(params[:id])
    render 'api/restaurants/show'
  end

  def search
    if params[:query].present?
      @restaurants = Restaurant.where("lower(name) ~ ?", params[:query].downcase) || []
      @cities = City.where("lower(name) ~ ?", params[:query].downcase) || []
    else
      @restaurants = Restaurant.none
      @cities = Cities.none
    end

    data = {cities: @cities, restaurants: @restaurants}.to_json
    render search_api_restaurants: data
  end

  def update
    @restaurant = Restaurant.find(restaurant_params[:id])

    if logged_in? && @restaurant.update(restaurant_params)
      render 'api/restaurants/show'
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def destroy
    restaurant = Restaurant.find(params[:id])
    restaurant.destroy
    render 'api/restaurants/show'
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:id, :user_id, :name,
      :phone, :cuisine, :description, :site, :address, :location, :city_id)
  end

  def format_address
    formatted = restaurant_params[:address].gsub(/\W+/, "+")
  end
end
