class ScoreboardController < ApplicationController
  def index
    @ranking = Game.all.sort_by { |game| game.time.to_i }
  end
end
