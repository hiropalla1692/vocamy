class AddColumnTrackId < ActiveRecord::Migration[5.2]
  def change
    add_column :vocas, :q_track_id, :string
  end
end
