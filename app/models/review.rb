class Review < ActiveRecord::Base
  validates :reservation_id, :rating, presence: true

  belongs_to :reservation
  belongs_to :restaurant
end
