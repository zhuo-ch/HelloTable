class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :city_name, null: false
      t.string :main_photo, null: false
      t.timestamps null: false
    end
  end
end
