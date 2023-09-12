class RenameWorkspaceIdToTeamId < ActiveRecord::Migration[6.1]
  def change
    rename_column :tasks, :workspace_id, :team_id
  end
end
