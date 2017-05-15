class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :restaurant_id
      t.integer :rating
      t.integer :food
      t.integer :service
      t.integer :ambiance
      t.integer :value
      t.timestamps null: false
    end
  end
end
