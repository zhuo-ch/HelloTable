class RemoveSplashFromCities < ActiveRecord::Migration
  def change
    remove_column :cities, :splash_photo
  end
end
