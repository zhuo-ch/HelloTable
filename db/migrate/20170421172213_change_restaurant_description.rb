class ChangeRestaurantDescription < ActiveRecord::Migration
  def change
    remove_column :restaurants, :description
    add_column :restaurants, :description, :text
  end
end
