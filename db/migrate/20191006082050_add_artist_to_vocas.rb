class AddArtistToVocas < ActiveRecord::Migration[5.2]
  def change
    add_column :vocas, :q_artist, :string
    add_column :vocas, :q_track, :string
    add_column :vocas, :q_lyric, :text
  end
end
