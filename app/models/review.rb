class Review < ActiveRecord::Base
  validates :reservation_id, :rating, presence: true
  before_save :add_to_rating

  scope :find_review, -> (id) { includes(:rating, :user, :reservation).find(id) }

  belongs_to :reservation
  has_one :restaurant, through: :reservation
  has_one :user, through: :reservation

  def self.get_pages(id, per_page)
    (Review.joins(:reservation).where(:reservations => { :restaurant_id => id }).count / per_page.to_i) + 1
  end

  def self.find_review(id)
    Review
      .includes(:rating, :user, :reservation)
      .find(id)
  end

  def add_to_rating
    self.restaurant.rating.add_review(self)
  end
end
