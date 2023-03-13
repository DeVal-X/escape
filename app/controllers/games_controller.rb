class GamesController < ApplicationController
  def index
    @games = Game.all.where(status: "pending")
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

  def random
    # check s'il y a une game en cours qui n'a pas encore de player 2
    if Game.where(second_user: nil).where.not(first_user: current_user).any?
      # si c'est le cas, on rejoint la game en c:niours avc game.player2 = current_user
      @game = Game.find_by(second_user: nil)
      @game.second_user = current_user
      @game.status = :lobby_full
      @game.data[:last_event] = :lobby_full
      @game.save
      GameChannel.broadcast_to(
        @game,
        @game.data.merge(status: 'lobby_full')
      )
    else
      # else => On crée une nouvelle game et on prend la position du player 1
      @game = Game.find_by(first_user: current_user, second_user: nil)
      @game = Game.create(first_user: current_user) if @game.nil?
      GameChannel.broadcast_to(
        @game,
        @game.data
      )
    end
    # on est ensuite redirigé vers la show du game
    redirect_to game_path(@game)
  end

  def join
    @game = Game.find(params[:id])
    @game.second_user = current_user
    @game.status = :lobby_full
    @game.save
    # broadcast et lobbyfull
    GameChannel.broadcast_to(
      @game,
      @game.data.merge(status: 'lobby_full')
    )
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
    @game.status = params[:game][:status]
    @game.data[:last_event] = @game.status
    @game.save
    #braodcast ?
  end

  def advance
    @game = Game.find(params[:id])
    @game.data[:last_event] = params[:last_event]
    @game.data[:successfull_challenges] = [] if @game.data[:successfull_challenges].nil?
    @game.data[:successfull_challenges].push(params[:successfull_challenges])

    @game.status = :level1 if @game.data[:successfull_challenges].include?("start-game")
    @game.status = :level2 if @game.data[:successfull_challenges].include?("open-door-one")
    @game.status = :ended if @game.data[:successfull_challenges].include?("open-door-two")
    @game.status = :dead if @game.data[:successfull_challenges].include?("player-died")

    @game.save
    GameChannel.broadcast_to(
      @game,
      @game.data
    )
    head :ok
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    redirect_to root_path
  end

  private

  def params_game
    params.require(:game).permit(:status, :first_user, :second_user)
  end
end
