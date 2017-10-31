class CreateSeatings < ActiveRecord::Migration
  def change
    create_table :seatings do |t|
      t.integer :restaurant_id, null: false
      t.integer :seats, null: false
      t.integer :max_tables, null: false
      t.timestamps null: false
    end
  end
end
