class CreateHours < ActiveRecord::Migration
  def change
    create_table :hours do |t|
      t.string :day, null: false
      t.integer :open, null: false
      t.integer :close, null: false
      t.integer :restaurant_id, null: false
      t.timestamps null: false
    end
  end
end
