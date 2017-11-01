class ChangeToUserId < ActiveRecord::Migration
  def change
    rename_column :restaurants, :owner_id, :user_id
  end
end
