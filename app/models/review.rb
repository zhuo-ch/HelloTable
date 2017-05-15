class Review < ActiveRecord::Base
  validates :reservation_id, :rating, presence: true
  before_save :add_to_rating

  def add_to_rating
    self.restaurant.rating.add_review(self)
  end

  belongs_to :reservation
  has_one :restaurant, through: :reservation
  has_one :user, through: :reservation
end
