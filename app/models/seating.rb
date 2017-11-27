class Seating < ActiveRecord::Base
  before_save :ensure_unique

  belongs_to :restaurant
  has_many :reservations

  def ensure_unique
    if self.restaurant.seatings.where(["seats = ? and max_tables = ?", self.seats, self.max_tables]).length == 0
      return true
    else
      errors.add(:base, "Table already exists")
      return false
    end
  end
end
