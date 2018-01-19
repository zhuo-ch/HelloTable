class Api::RestaurantsController < ApplicationController
  def index
    data = Restaurant.find_restaurants_in_city(params)
    @restaurants = data[0]
    @params = data[1]

    render 'api/restaurants/index'
  end

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
    @restaurant = Restaurant.find_restaurant(params[:id])
    render 'api/restaurants/show'
  end

  def search
    if params[:query].present?
      @restaurants = Restaurant.search_restaurants(params[:query].downcase)
      @cities = City.search_city(params[:query].downcase)
    else
      @restaurants = Restaurant.none
      @cities = Cities.none
    end

    render 'api/restaurants/search'
  end

  def update
    @restaurant = Restaurant.find(restaurant_params[:id])

    if logged_in? && @restaurant.update(restaurant_params)
      render 'api/restaurants/update'
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
