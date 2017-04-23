class Photo < ActiveRecord::Base
  belongs_to :restaurant

  validates :restaurant, presence: true

  has_attached_file :image, default_url: "wine.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
