class CreateVocas < ActiveRecord::Migration[5.2]
  def change
    create_table :vocas do |t|
      t.string :name, null: false
      t.text :japanese, null: false
      t.string :q_artist
      t.string :q_track
      t.text :q_lyric
      t.timestamps
    end
  end
end
