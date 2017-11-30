class Seating < ActiveRecord::Base
  before_save :ensure_unique

  belongs_to :restaurant
  has_many :reservations

  def self.find_by_params(restaurant_id, seats)
      Seating.where(["restaurant_id = ? and seats = ?", restaurant_id, seats])
  end

  def ensure_unique
    entries = self.restaurant.seatings.where(["seats = ?", self.seats])

    if entries.length == 0
      return true
    elsif entries.length == 1 && entries.first.id == self.id
      return true
    else
      errors.add(:base, "Table already exists")
      return false
    end
  end
end
