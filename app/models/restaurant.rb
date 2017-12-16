class Restaurant < ActiveRecord::Base
  validates :user_id, :name, :description, :address, :location, :phone, presence: true
  before_save :ensure_rating
  # , :set_address

  def format_address
    self.address.gsub(/\W+/, "+")
  end

  def ensure_rating
    if self.rating.nil?
      Rating.create(restaurant: self)
    end
  end

  def get_reservations(date, time)
    start_hour = time.to_i - 200
    end_hour = time.to_i + 200

    self.reservations.where(["time > ? and time < ? and date = ?", start_hour, end_hour, date])
  end

  def set_address
    address = self.format_address
    url = "https://maps.googleapis.com/maps/api/geocode/json?address="

    response = RestClient::Request.execute(
      method: :get,
      url: "#{url}#{address}&key=#{ENV['google_places_key']}")

    response_address = JSON.parse(response)

    if response_address["results"].length < 1 || response_address["results"][0]["partial_match"]
      errors.add(:base, "Unable to find address.")
      return false
    else
      result = response_address["results"][0]
      self.location = result["geometry"]["location"]
      self.address = result["formatted_address"]
      self.city_id = self.city_id ? self.city_id : City.in_bounds(result["geometry"]["location"])
    end
  end

  belongs_to :city
  belongs_to :user
  has_one :rating, inverse_of: :restaurant
  has_many :reservations
  has_many :favorites
  has_many :reviews, through: :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
  has_many :seatings
  has_many :hours
end
