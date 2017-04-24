class AddCityKeyToRestaurants < ActiveRecord::Migration
  def change
    add_column :restaurants, :city_id, :integer, null: false
  end
end
