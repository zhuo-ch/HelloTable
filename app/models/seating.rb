class Seating < ActiveRecord::Base
  before_save :ensure_unique

  belongs_to :restaurant
  has_many :reservations, inverse_of: :seating

  def self.find_by_params(restaurant_id, seats)
      Seating.where(["restaurant_id = ? and seats = ?", restaurant_id, seats])
  end

  def ensure_unique
    if self.restaurant.seatings.where(["seats = ?", self.seats]).length == 0
      return true
    else
      errors.add(:base, "Table already exists")
      return false
    end
  end
end
