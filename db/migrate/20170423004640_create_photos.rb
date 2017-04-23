class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :restaurant_id
      t.timestamps null: false
    end
  end
end
