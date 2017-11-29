class Reservation < ActiveRecord::Base
  validates :user_id, :restaurant_id, presence: true
  before_save :set_seating

  def set_seating
    self.seating_id
  end
  belongs_to :user
  belongs_to :restaurant
  belongs_to :seating
  has_one :review, inverse_of: :reservation
end
