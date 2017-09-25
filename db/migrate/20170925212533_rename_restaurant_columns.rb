class RenameRestaurantColumns < ActiveRecord::Migration
  def change
    rename_column :restaurants, :restaurant_name, :name
    rename_column :restaurants, :restaurant_number, :phone
  end
end
