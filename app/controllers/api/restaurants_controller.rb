class Api::RestaurantsController < ApplicationController

  def index
    if params[:cityId]
      @restaurants = Restaurant.includes(:rating).includes(:reviews).includes(:photos).where("state = ?", City.find(params[:cityId]).state)
    elsif params[:query]
      @restaurants = Restaurant.includes(:rating).includes(:reviews).includes(:photos).where("name ~ ?", params[:query]);
    else
      render json: ['No results found'], status: 422
    end
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    # address = format_address
    #
    # url = "https://maps.googleapis.com/maps/api/geocode/json?address="
    # response = RestClient::Request.execute(
    #   method: :get,
    #   url: "#{url}#{address}&key=#{ENV['google_places_key']}"
    # )
    #
    # response_address = JSON.parse(response)["results"][0]
    # @restaurant.location = response_address["geometry"]["location"]
    # @restaurant.address = response_address["formatted_address"]
    # @restaurant.city_id = City.in_bounds(response_address["geometry"]["location"])

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
    @restaurant = Restaurant.includes(:rating).includes(:reviews).includes(:photos).find(params[:id])
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
    restaurant_params[:address].split(', ').each { |el| el.gsub(" ", "+")}
  end
end
