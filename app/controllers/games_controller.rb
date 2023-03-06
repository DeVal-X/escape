class GamesController < ApplicationController

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
  end

  def new
    @game = Game.new
  end

  def create
    @first_user = current_user
    @game = Game.new(params_game)
    @game.first_user = @first_user
    if game.save!
      redirect_to game_path(@game)
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    @game = Game.find(params[:id])
    @game.level_up!
  end

  private

  def params_game
    params.require(:game).permit( :status, :first_user, :second_user)

  end

end
