class ChangeSeatsToSeatingsForeignKey < ActiveRecord::Migration
  def change
    remove_column :reservations, :seats
    add_column :reservations, :seating_id, :integer, null: false
  end
end
