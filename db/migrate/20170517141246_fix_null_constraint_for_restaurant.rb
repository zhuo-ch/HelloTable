class FixNullConstraintForRestaurant < ActiveRecord::Migration
  def change
    change_column :restaurants, :city_id, :integer, null: true
  end
end
