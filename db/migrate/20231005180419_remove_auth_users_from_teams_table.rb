class RemoveAuthUsersFromTeamsTable < ActiveRecord::Migration[6.1]
  def change
    remove_column :teams, :auth_users
  end
end
