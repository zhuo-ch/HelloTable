class Restaurant < ActiveRecord::Base
  validates :owner_id, :name, :description, :address, :location, :phone, presence: true
  after_initialize :ensure_rating

  def ensure_rating
    Rating.create(restaurant: self) unless self.rating
  end

  def get_reservations(date, time)
    start_hour = time.to_i - 200
    end_hour = time.to_i + 200

    self.reservations.where(["time > ? and time < ? and date = ?", start_hour, end_hour, date])
  end

  def set_address(address)
    url = "https://maps.googleapis.com/maps/api/geocode/json?address="
    response = RestClient::Request.execute(
      method: :get,
      url: "#{url}#{address}&key=#{ENV['google_places_key']}"
    )

    response_address = JSON.parse(response)["results"][0]
    self.location = response_address["geometry"]["location"]
    self.address = response_address["formatted_address"]
    self.city_id = City.in_bounds(response_address["geometry"]["location"])
  end

  belongs_to :city
  belongs_to :owner
  has_one :rating, inverse_of: :restaurant
  has_many :reservations
  has_many :favorites
  has_many :reviews, through: :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
  has_many :seatings
  has_many :hours
end
