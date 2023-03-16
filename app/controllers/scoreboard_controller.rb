class ScoreboardController < ApplicationController
  def index
    @ended = Game.all.reject { |game| game.time.to_i.zero? }.sort_by { |game| game.time.to_i }
    @dead = Game.all.select { |game| game.time == "A trépassé" }
    @ranking = @ended + @dead
  end
end
