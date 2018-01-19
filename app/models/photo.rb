class Photo < ActiveRecord::Base
  validates :restaurant, presence: true

  belongs_to :restaurant

  has_attached_file :image, default_url: "wine.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
