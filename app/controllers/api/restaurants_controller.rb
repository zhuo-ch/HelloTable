class Api::RestaurantsController < ApplicationController

  def index
    @restaurants = Restaurant.where("state = ?", City.find(params[:cityId]).state)
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    city = City.where("state = ?", restaurant_params[:state]).first
    @restaurant.city_name = city.city_name
    @restaurant.city = city

    if @restaurant.save
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
    @restaurant = Restaurant.find(params[:id])
    render 'api/restaurants/show'
  end

  def search
    if params[:query].present?
      @restaurants = Restaurant.where("lower(restaurant_name) ~ ?", params[:query].downcase)
    else
      @restaurants = Restaurant.none
    end
    
    render 'api/restaurants/search'
  end

  def update
    @restaurant = Restaurant.find(params[:id])

    if @restaurant.update(restaurant_params)
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
    params.require(:restaurant).permit(:owner_id, :restaurant_name,
      :restaurant_number, :cuisine, :description, :hours, :site,
      :state, :street_address, :zip, :city_id)
  end
end
