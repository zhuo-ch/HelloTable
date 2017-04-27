class FixDateForReservations < ActiveRecord::Migration
  def change
    remove_column :reservations, :date
    add_column :reservations, :date, :string, null: false
  end
end
