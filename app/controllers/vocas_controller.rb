class VocasController < ApplicationController
  def index
    @vocas = Voca.order(:name)
    @voca = Voca.new
  end

  def create
    @voca = Voca.new(voca_params)
    if @voca.save
      render json: @voca
    else
      render json: @voca.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @voca = Voca.find(params[:id])
    @voca.destroy
    render json: @voca
  end

  def show
  end

  def new
  end

  def edit
  end

  private

  def voca_params
    params.require(:voca).permit(:name, :japanese, :q_track, :q_artist, :q_lyric, :user_id, :q_track_id)
  end
end
