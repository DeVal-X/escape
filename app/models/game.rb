class Game < ApplicationRecord
  belongs_to :first_user, foreign_key: :first_user_id, class_name: "User"
  belongs_to :second_user, foreign_key: :second_user_id, class_name: "User", optional: true

  has_many :items
  enum :status, {
    pending: 0,
    start: 1,
    level1: 2,

  }
end
