class Restaurant < ActiveRecord::Base
  validates :owner_id, :restaurant_name, :description, :street_address, :city, :state,presence: true
  validates :restaurant_number, presence: true, uniqueness: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id

  has_many :photos, dependent: :destroy, inverse_of: :restaurant
end
