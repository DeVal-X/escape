class Game < ApplicationRecord
  # class GameEnded < StandardError; end
  before_validation :default_name

  belongs_to :first_user, foreign_key: :first_user_id, class_name: "User"
  belongs_to :second_user, foreign_key: :second_user_id, class_name: "User", optional: true

  has_many :items

  validates :name, presence: true
  enum status: %i[
    pending
    lobby_full
    start
    level1
    level2
    ended
    dead
  ]

  private

  def default_name
    self.name = "#{first_user.email}'s game" unless name.present?
  end
end
