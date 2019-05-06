class VocasController < ApplicationController
  def index
    @vocas = Voca.order(:name)
    @voca = Voca.new
  end

  def create
    @voca = Voca.create(voca_params)
    @vocas = Voca.order(:name)
  end

  def show
  end

  def new
  end

  def edit
  end

  private

  def voca_params
    params.require(:voca).permit(:name, :japanese)
  end
end
