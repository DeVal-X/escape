class GamesController < ApplicationController

  def index
    @games = Game.all
  end

  def show
    @game = Game.find(params[:id])
    @game_ready = @game.first_user.present? && @game.second_user.present?
    # si les 2 joueurs sont là, le jeu commence     # if Game.where(first_user_id: true && second_user_id: true)
    # else, ce qui est affiché est une sorte de salle d'attente
  end

  def new
    @game = Game.new
  end

  def join
    # check s'il y a une game en cours qui n'a pas encore de player 2
    if Game.where(second_user: nil).where.not(first_user: current_user).any?
      # si c'est le cas, on rejoint la game en c:niours avc game.player2 = current_user
      @game = Game.find_by(second_user: nil)
      @game.second_user = current_user
      @game.save
    else
      # else => On crée une nouvelle game et on prend la position du player 1
      @game = Game.find_by(first_user: current_user, second_user: nil)
      @game = Game.create(first_user: current_user) if @game.nil?
    end
    # on est ensuite redirigé vers la show du game
    redirect_to game_path(@game)
  end

  def create
    @first_user = current_user
    @game = Game.new(params_game)
    @game.first_user = @first_user
    @game.status = :pending
    if game.save!
      redirect_to game_path(@game)
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    @game = Game.find(params[:id])
    # @game.level_up!
  end

  private

  def params_game
    params.require(:game).permit( :status, :first_user, :second_user)
  end
end
