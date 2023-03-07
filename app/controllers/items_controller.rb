class ItemsController < ApplicationController
  def index
    @user = current_user
    @game = Game.find(params[:game_id])
    @items = @user.items.where(game_id: @game)
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
  end

  private

  def params_item
    params.require(:item).permit(:name, :description)
  end
end
