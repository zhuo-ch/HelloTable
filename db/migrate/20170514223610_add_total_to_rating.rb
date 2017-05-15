class AddTotalToRating < ActiveRecord::Migration
  def change
    add_column :ratings, :total, :integer
  end
end
