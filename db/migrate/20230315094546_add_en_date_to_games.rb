class AddEnDateToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :end_date, :datetime
  end
end
