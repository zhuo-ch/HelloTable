class City < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  scope :search_city, -> (query) { where("lower(name) ~ ?", query) }
  scope :get_city, -> (id) { includes(restaurants: [:photos, :ratings, :reviews])}

  has_many :restaurants
  has_many :ratings, through: :restaurants
  has_many :reviews, through: :restaurants
  has_many :photos, through: :restaurants
  has_attached_file :image, default_url: "wine.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  attr_accessor :pages, :page, :per_page

  def self.find_city(params)
    city = City.get_city(params[:id])
    city.per_page = params[:per_page] ? params[:per_page] : 10

    if params[:page]
      city.page = params[:page]
    end

    city
  end

  def self.in_bounds(latLng)
    x = where("lat + 2 > ?
      AND lat - 2 < ?
      AND lng + 2 > ?
      AND lng -2 < ?",
      latLng["lat"], latLng["lat"], latLng["lng"], latLng["lng"])
    x.first.id
  end
end
