class Reservation < ActiveRecord::Base
  validates :user_id, :restaurant_id, presence: true
  before_save :ensure_available

  def ensure_available
    x = Reservation
      .where("date = ?", self.date)
      .where("time = ?", self.time)
      .where("seating_id = ?", self.seating_id)
      .count
    x < Seating.find(self.seating_id).max_tables
  end

  belongs_to :user
  belongs_to :restaurant
  belongs_to :seating
  has_one :review, inverse_of: :reservation
end
