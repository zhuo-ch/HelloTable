class ChangeCityName < ActiveRecord::Migration
  def change
    remove_column :restaurants, :city
    add_column :restaurants, :city_name, :string
  end
end
