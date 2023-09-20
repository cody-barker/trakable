class AddAuthUsersToTeams < ActiveRecord::Migration[6.1]
  def change
    add_column :teams, :auth_users, :integer, array: true, default: []
  end
end
