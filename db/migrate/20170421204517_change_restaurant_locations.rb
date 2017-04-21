class ChangeRestaurantLocations < ActiveRecord::Migration
  def change
    remove_column :restaurants, :location
    add_column :restaurants, :street_address, :string
    add_column :restaurants, :city, :string
    add_column :restaurants, :state, :string
  end
end
