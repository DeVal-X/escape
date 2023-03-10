class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.integer :status, default: 0, index: true
      t.date :time
      t.references :first_user, null: false, foreign_key: { to_table: :users }
      t.references :second_user, null: true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
