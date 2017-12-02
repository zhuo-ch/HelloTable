class AddSeatsToReservations < ActiveRecord::Migration
  def change
    add_column :reservations, :seats, :integer, null: false
  end
end
