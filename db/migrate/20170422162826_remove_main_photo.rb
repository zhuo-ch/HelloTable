class RemoveMainPhoto < ActiveRecord::Migration
  def change
    remove_column :cities, :main_photo
  end
end
