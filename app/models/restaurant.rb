class Restaurant < ActiveRecord::Base
  validates :user_id, :name, :description, :address, :location, :phone, presence: true
  before_create :ensure_rating
  before_update :ensure_address

  scope :search_restaurants, -> (query) { where("lower(name) ~ ?", query) }
  scope :get_pages, -> (id, per_page) { (where(city_id: id).count / per_page) + 1 }

  belongs_to :city
  belongs_to :user
  has_one :rating, inverse_of: :restaurant
  has_many :reservations
  has_many :favorites
  has_many :reviews, through: :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
  has_many :seatings
  has_many :hours
  has_many :sample_review, -> { order("RANDOM()").limit(1) },
    through: :reservations, source: :review

  def self.find_restaurants_in_city(params)
    params[:per_page] = params[:per_page] ? params[:per_page].to_i : 10
    params[:pages] = params[:pages] ? params[:pages].to_i : get_pages(params[:id], params[:per_page])
    params[:page] = params[:page] ? params[:page].to_i : 1
    filter = params[:filter] ? get_filter(params[:filter]) : get_filter("Top Rated")

    restaurants = Restaurant
      .includes(:photos, :rating, :sample_review)
      .where(city_id: params[:id])
      .order(filter)
      .offset(params[:per_page] * (params[:page] - 1))
      .limit(params[:per_page])

    [restaurants, params]
  end

  def self.find_manager_restaurant(id)
    Restaurant
      .includes(:hours, :seatings, :rating, :photos)
      .includes(reviews: [:user, :reservation])
      .find_by(user_id: id)
  end

  def self.find_restaurant(id)
    Restaurant
      .includes(:rating, :photos, :hours, :seatings)
      .includes(reviews: [:user, :reservation])
      .find(id)
  end

  def self.get_filter(type)
    case type
    when "Top Rated"
      "ratings.rating / ratings.total DESC"
    when "Best Value"
      "ratings.value / ratings.total DESC"
    when "Newest Restaurants"
      "created_at DESC"
    end
  end

  def format_address
    self.address.gsub(/\W+/, "+")
  end

  def ensure_rating
    if self.rating.nil?
      Rating.create(restaurant: self)
      return true
    end
    false
  end

  def get_reservations(date, time)
    start_hour = time.to_i - 200
    end_hour = time.to_i + 200

    self.reservations.where("time > ? AND time < ? AND date = ?", start_hour, end_hour, date)
  end

  def ensure_address
    if address_changed?
       self.set_address
    end
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
end
