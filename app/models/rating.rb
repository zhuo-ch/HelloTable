class Rating < ActiveRecord::Base
  validates :restaurant, presence: true
  validates :restaurant, uniqueness: true
  before_create :set_defaults

  def set_defaults
    self.total = 0
    self.rating = 0
    self.food = 0
    self.service = 0
    self.ambiance = 0
    self.value = 0
  end

  def add_review(review)
    self.total += 1
    self.rating += review.rating
    self.food += review.food
    self.service += review.service
    self.ambiance += review.ambiance
    self.value += review.value
    self.save
  end

  belongs_to :restaurant
end
