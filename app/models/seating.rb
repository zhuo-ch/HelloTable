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
      .select(:time, "seating_id")
      .where("date = ?", query[:date])
      .where("time BETWEEN ? AND ?", (time - 200), (time + 200))
      .where("seats = ?", query[:seats])
      .where("seatings.restaurant_id = ?", query[:restaurantId])
      .references(:seatings)
      .group(:time, :seating_id, :max_tables)
      .having("count(reservations.id) >= seatings.max_tables")
      # .where.not(time: [time - 130, time - 100, time - 30, time, time +70, time + 100, time + 170])

    arr = Seating.get_times(time)
    results = {}
    arr.each { |a| results[a] = true }
    seating.each { |seat| results[seat.time] = false }
    results["seating_id"] = seating.first.seating_id
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
