class Api::ReviewsController < ApplicationController

  def index
    debugger
    restaurant = Restaurant.find(params[:restaurant_id])
    @reviews = restaurant.reviews.all
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    render
  end

  private
  def review_params
    params.require(:review).permit(:reservation_id, :rating,
      :details, :food, :service, :ambiance, :value)
  end
end
