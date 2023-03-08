class ChageGameDateToString < ActiveRecord::Migration[7.0]
  def change
    change_column :games, :time, :string
  end
end
