class Game < ApplicationRecord
  # class GameEnded < StandardError; end
  belongs_to :first_user, foreign_key: :first_user_id, class_name: "User"
  belongs_to :second_user, foreign_key: :second_user_id, class_name: "User", optional: true

  has_many :items
  enum status: [ :pending, :lobby_full, :start, :level1, :level2, :ended, :dead, :score ]

  # def level_up!
  #   current_status_index = Game.statuses.keys.index(status)
  #   # raise GameEnded if current_status_index + 1 >= Game.statuses.count

  #   next_status_method = Game.statuses.keys[current_status_index + 1]
  #   send("#{next_status_method}!")
  # end
end
