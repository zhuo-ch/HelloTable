class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.integer :user_id, null: false
      t.integer :restaurant_id, null: false
      t.integer :seats, null: false
      t.string :date, null: false
      t.integer :time, null: false
    end
  end
end
