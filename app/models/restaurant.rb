class Restaurant < ActiveRecord::Base
  validates :owner_id, :restaurant_name, :description, presence: true
  validates :restaurant_number, :location, presence: true, uniqueness: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id,
    primary_key: :id
end
