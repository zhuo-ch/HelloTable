class Seating < ActiveRecord::Base
  before_save :ensure_unique

  belongs_to :restaurant
  has_many :reservations

  def self.find_by_params(restaurant_id, seats)
      Seating.where(["restaurant_id = ? and seats = ?", restaurant_id, seats])
  end

  def self.availabilities(query)
    time = query[:time].to_i
    seating = Reservation.joins(:seating)
      .select(:time)
      .where("date = ?", query[:date])
      .where("time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seats = ?", query[:seats])
      .where("seatings.restaurant_id = ?", query[:restaurantId])
      .references(:seatings)
      .group(:time, :max_tables)
      .having("count(reservations.id) < seatings.max_tables")
      .where.not(time: [time - 130, time - 100, time - 30, time, time +30, time + 100, time + 130, time + 200])
    debugger
  end
  # Seating.where(restaurant_id: query[:restaurantId]).where.not(id: (Seating.joins(:reservations)
  #   .where("reservations.date = ?", query[:date])
  #   .where("reservations.time BETWEEN ? AND ?", (time - 200), (time + 200))
  #   .where("seats = ?", query[:seats])
  #   .where("seatings.restaurant_id = ?", query[:restaurantId])
  #   .references(:reservations, :seatings)
  #   .group(:id, :time)
  #   .having("count(seatings.id) > max_tables")))

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
