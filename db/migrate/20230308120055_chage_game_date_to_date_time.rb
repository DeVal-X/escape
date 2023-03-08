class ChageGameDateToDateTime < ActiveRecord::Migration[7.0]
  def change
    change_column :games, :time, :datetime
  end
end
