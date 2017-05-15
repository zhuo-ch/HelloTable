class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :reservation_id, null: false
      t.integer :rating, null: false
      t.text :details
      t.integer :food
      t.integer :service
      t.integer :ambiance
      t.integer :value
      t.timestamps null: false
      t.timestamps null: false
    end
  end
end
