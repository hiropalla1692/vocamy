class AddUserReferences < ActiveRecord::Migration[5.2]
  def change
    add_reference :vocas, :user, index: true, foreign_key: true
    add_index :vocas, [:user_id, :created_at]
  end
end
