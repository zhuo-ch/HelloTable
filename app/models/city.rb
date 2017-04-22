class City < ActiveRecord::Base
  validates :city_name, presence: true, uniqueness: true

  has_attached_file :image, default_url: "wine.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
