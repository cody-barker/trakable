class RenameTeamToWorkspace < ActiveRecord::Migration[6.1]
  def change
    rename_column :tasks, :team_id, :workspace_id
  end
end
