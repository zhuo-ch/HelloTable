class Reservation < ActiveRecord::Base
  validates :user_id, :restaurant_id, presence: true
  before_save :ensure_available

  scope :find_all_reservations, -> (date, id) { includes(:user).where(date: date, restaurant_id: id) }
  scope :find_reservation, -> (id) { includes(:restaurants, :photos, :ratings).find(id) }

  belongs_to :user
  belongs_to :restaurant
  belongs_to :seating
  has_one :review, inverse_of: :reservation

  # def self.find_all_reservations(date, id)
  #   Reservation
  #     .includes(:user)
  #     .where(date: date)
  #     .where(restaurant_id: id)
  # end
  # 
  # def self.find_reservation(id)
  #   Reservation
  #     .find(id)
  #     .includes(:restaurants)
  #     .includes(:photos)
  #     .includes(:ratings)
  # end

  def self.search_reservations(date, time, seats_id, restaurant_id)
    Reservation
      .joins(:seating)
      .where("date = ?", date)
      .where("time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seating_id = ?", seats_id)
      .where("seatings.restaurant_id = ?", restaurant_id)
      .references(:seatings)
  end

  def ensure_available
    x = Reservation
      .where("date = ?", self.date)
      .where("time = ?", self.time)
      .where("seating_id = ?", self.seating_id)
      .count
    x < Seating.find(self.seating_id).max_tables
  end
end
