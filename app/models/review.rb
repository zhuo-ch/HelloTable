class Review < ActiveRecord::Base
  validates :reservation_id, :rating, presence: true

  belongs_to :reservation
  has_one :restaurant, through: :reservation
  has_one :user, through: :reservation
end
