class Seating < ActiveRecord::Base
  validates :seats, :max_tables, numericality: { only_integer: true, greater_than: 0 }
  before_save :ensure_unique

  scope :find_by_params, -> (id, seats) { where("restaurant_id = ? AND seats = ?", id, seats) }

  belongs_to :restaurant
  has_many :reservations

  def self.availabilities(query)
    time = query[:time].to_i
    seating = Reservation.joins(:seating)
      .select(:time, "seating_id")
      .where("date = ?", query[:date])
      .where("time BETWEEN ? AND ?", (time - 101), (time + 101))
      .where("seating_id = ?", query[:seating_id])
      .group(:time, :seating_id, :max_tables)
      .having("count(reservations.id) >= seatings.max_tables")

    arr = Seating.get_times(time)
    results = { seating_id: query["seating_id"] }
    arr.each { |a| results[a] = true }
    seating.each { |seat| results[seat.time] = false }
debugger
    results
  end

  def self.get_times(time)
    time_arr = []
    start_time = time - 100

    while start_time <= time + 100
      time_arr.push(start_time)
      start_time += 30

      if start_time.to_s.slice(-2, 2).to_i > 30
        start_time += 40
      end
    end

    time_arr
  end

  def ensure_unique
    entries = self.restaurant.seatings.where("seats = ?", self.seats)

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
