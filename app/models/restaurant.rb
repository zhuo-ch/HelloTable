class Restaurant < ActiveRecord::Base
  # validates :owner_id, :restaurant_name, :description, :street_address, :state, :restaurant_number, presence: true

  def get_reservations(date, time)
    start_hour = ((time.slice(0.. -3).to_i) - 2).to_s + (time.slice(-2.. -1))
    end_hour = ((time.slice(0.. -3).to_i) + 2).to_s + (time.slice(-2.. -1))

    x = self.reservations.where(["time > ? and time < ?", start_hour, end_hour])
  end

  def city_name=(name)
    self.city_name = name
  end

  belongs_to :city
  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id

  has_many :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
end
