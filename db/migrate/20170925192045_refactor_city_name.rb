class RefactorCityName < ActiveRecord::Migration
  def change
    rename_column :cities, :city_name, :name
  end
end
