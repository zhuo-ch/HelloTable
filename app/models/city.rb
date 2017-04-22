class City < ActiveRecord::Base
  validates :city_name, presence: true, uniqueness: true

end
