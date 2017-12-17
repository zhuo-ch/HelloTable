class City < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  def self.find_city(id)
    city = City
    .includes(restaurants: [:photos, :rating, :reviews])
    .find(id)
  end

  def self.in_bounds(latLng)
    x = where("lat + 2 > ?
      AND lat - 2 < ?
      AND lng + 2 > ?
      AND lng -2 < ?",
      latLng["lat"], latLng["lat"], latLng["lng"], latLng["lng"])
    x.first.id
  end

  has_many :restaurants
  has_many :ratings, through: :restaurants
  has_many :reviews, through: :restaurants
  has_many :photos, through: :restaurants
  has_attached_file :image, default_url: "wine.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
