class ChangeColumnReservations < ActiveRecord::Migration
  def change
    remove_column :reservations, :restaurants_id
    add_column :reservations, :restaurant_id, :integer, null: false
  end
end
