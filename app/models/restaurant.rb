require 'json'

class Restaurant < ActiveRecord::Base
  validates :owner_id, :restaurant_name, :description, :street_address, :state, :restaurant_number, presence: true

  def get_reservations(date, time)
    start_hour = time.to_i - 200
    end_hour = time.to_i + 200


    x = self.reservations.where(["time > ? and time < ? and date = ?", start_hour, end_hour, date])

    return x
  end

  # def average_reviews(reviews)
  #   ratings = Hash.new(0)
  #   count = 0.to_f
  #   reviews.each do |review|
  #     ratings[:rating] += review.rating ? review.rating : 0
  #     ratings[:food] += review.food ? review.food : 0
  #     ratings[:service] += review.service ? review.service : 0
  #     ratings[:ambiance] += review.ambiance ? review.ambiance : 0
  #     ratings[:value] += review.value ? review.value : 0
  #     count += 1
  #   end
  #   ratings.each { |k, v| ratings[k] = ((v/count)*2).round/2.to_f }
  #   ratings[:total] = count
  #   ratings
  # end

  belongs_to :city
  belongs_to :owner
    # class_name: "User",
    # foreign_key: :owner_id,
    # primary_key: :id

  has_many :reservations
  has_many :reviews, through: :reservations
  has_many :photos, dependent: :destroy, inverse_of: :restaurant
end
