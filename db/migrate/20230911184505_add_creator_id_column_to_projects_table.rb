class AddCreatorIdColumnToProjectsTable < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :creator_id, :integer
  end
end
