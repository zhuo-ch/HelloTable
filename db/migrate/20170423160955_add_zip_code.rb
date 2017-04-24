class AddZipCode < ActiveRecord::Migration
  def change
    add_column :restaurants, :zip, :string
  end
end
