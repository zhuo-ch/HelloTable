class Review < ActiveRecord::Base
  validates :reservation_id, :rating, presence: true
  before_save :add_to_rating

  # def self.find_all(params)
  #   params[:per_page] = params[:per_page] ? params[:per_page].to_i : 10
  #   params[:pages] = params[:pages] ? params[:pages].to_i : get_pages(params[:id], params[:per_page])
  #   params[:page] = params[:page] ? params[:page].to_i : 1
  #
  #   reviews = Restaurant
  #     .find(params[:id])
  #     .includes(:review => [ :user, :reservation, :restaurant ])
  #     .offset(params[:per_page] * (params[:page] - 1))
  #     .limit(params[:per_page])
  #
  #   [reviews, params]
  # end
  #
  # def self.find_res(id)
  #   restaurant = Restaurant
  #     .includes(
  #       :rating,
  #       :photos,
  #       :hours,
  #       :seatings)
  #     .includes(reviews: [ :user, :reservation ])
  #     .find(id)
  # end

  def self.get_pages(id, per_page)
    (Review.joins(:reservation).where(:reservations => { :restaurant_id => id }).count / per_page.to_i) + 1
  end

  def add_to_rating
    self.restaurant.rating.add_review(self)
  end

  belongs_to :reservation
  has_one :restaurant, through: :reservation
  has_one :user, through: :reservation
end
