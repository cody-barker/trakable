class RemoveCreatorIdFromTeamsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :teams, :creator_id
  end
end
