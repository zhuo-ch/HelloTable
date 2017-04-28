class ChangeSeatsColumn < ActiveRecord::Migration
  def change
    remove_column :reservations, :seats
    add_column :reservations, :seats, :string, null: false
  end
end
