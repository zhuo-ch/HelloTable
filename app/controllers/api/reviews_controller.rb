class Api::ReviewsController < ApplicationController

  def index
    @reviews = Restaurant
      .find(params[:restaurant_id])
      .reviews
      .all
      .includes(:user, :reservation, :restaurant)
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render 'api/reviews/show'
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def show
    @review = Review
    .includes(:rating, :user, :reservation)
    .find(params[:id])
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
