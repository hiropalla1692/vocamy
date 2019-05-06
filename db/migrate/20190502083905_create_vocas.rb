class CreateVocas < ActiveRecord::Migration[5.2]
  def change
    create_table :vocas do |t|
      t.string :name
      t.text :japanese

      t.timestamps
    end
  end
end
