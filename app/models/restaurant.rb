require 'json'

class Restaurant < ActiveRecord::Base
  validates :owner_id, :restaurant_name, :description, :street_address, :state, :restaurant_number, presence: true
  after_initialize :ensure_rating
  before_create :ensure_city

  def ensure_rating
    Rating.create(restaurant: self) unless self.rating
  end

  def ensure_city
    if self.state != ''
      city = City.where("lower(state) = ?", self.state.downcase).first
      self.city_id = city.id
    end
  end

  def get_reservations(date, time)
    start_hour = time.to_i - 200
    end_hour = time.to_i + 200

    x = self.reservations.where(["time > ? and time < ? and date = ?", start_hour, end_hour, date])

    return x
  end

  belongs_to :city
  belongs_to :owner
  has_one :rating, inverse_of: :restaurant
  has_many :reservations
  has_many :favorites
  has_many :reviews, through: :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
end
