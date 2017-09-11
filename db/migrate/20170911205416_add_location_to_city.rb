class AddLocationToCity < ActiveRecord::Migration
  def change
    add_column :cities, :latLng, :string
    add_column :restaurants, :location, :string
    add_column :restaurants, :address, :string, null: false
    remove_column :restaurants, :street_address, :string
    remove_column :restaurants, :city_name, :string
    remove_column :restaurants, :state, :string
    remove_column :restaurants, :zip, :string
  end
end
