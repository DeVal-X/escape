class AddDataToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :data, :json, default: {}
  end
end
