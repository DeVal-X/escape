class ItemsController < ApplicationController
  def index
    @items = Item.all
  end

  def show
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new()
  end

  def destroy

  end

  private

  def params_item
    
  end
end
