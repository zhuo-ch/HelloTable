class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.integer :user_id, null: false
      t.string :restaurant_name, null: false
      t.string :cuisine
      t.string :restaurant_number, null: false
      t.text :description, null: false
      t.string :hours
      t.string :site
      t.string :location, null: false
      t.timestamps null: false
    end
  end
end
