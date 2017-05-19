class Api::RestaurantsController < ApplicationController

  def index
    if params[:cityId]
      @restaurants = Restaurant.includes(:rating).includes(:reviews).includes(:photos).where("state = ?", City.find(params[:cityId]).state)
    elsif params[:query]
      @restaurants = Restaurant.includes(:rating).includes(:reviews).includes(:photos).where("restaurant_name ~ ?", params[:query]);
    else
      render json: ['No results found'], status: 422
    end
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

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
    @restaurant = Restaurant.includes(:rating).includes(:reviews).includes(:photos).find(params[:id])
    render 'api/restaurants/show'
  end

  def search
    if params[:query].present?
      @restaurants = Restaurant.where("lower(restaurant_name) ~ ?", params[:query].downcase) || []
      @cities = City.where("lower(city_name) ~ ?", params[:query].downcase) || []
    else
      @restaurants = Restaurant.none
      @cities = Cities.none
    end

    data = {cities: @cities, restaurants: @restaurants}.to_json
    render search_api_restaurants: data
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
      :restaurant_number, :cuisine, :description, :hours, :site, :city_name,
      :state, :street_address, :zip, :city_id)
  end
end
