class ChangeCitiesLatlng < ActiveRecord::Migration
  def change
    remove_column :cities, :latLng
    add_column :cities, :lat, :float, null: false
    add_column :cities, :lng, :float, null: false
  end
end
