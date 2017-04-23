class Api::RestaurantsController < ApplicationController

  def index
    @restaurants = Restaurant.all.where("city = ?", City.find(params[:cityId]).city_name)
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save!
      if params[:restaurant][:imageFiles]
        params[:restaurant][:imageFiles].each do |image|
            @restaurant.photos.create(image: image)
        end
      end

      redirect_to api_restaurant_url(@restaurant.id)
    else
      render json: @restaurant.errors.full_messages, status: 422
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    render 'api/restaurants/show'
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
  end

  private
  def restaurant_params
    params.require(:restaurant).permit(:owner_id, :restaurant_name,
      :restaurant_number, :cuisine, :description, :hours, :site, :city,
      :state, :street_address)
  end
end
