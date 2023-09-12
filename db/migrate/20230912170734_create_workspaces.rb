class CreateWorkspaces < ActiveRecord::Migration[6.1]
  def change
    create_table :workspaces do |t|
      t.string :name
      t.string :description
      t.integer :creator_id

      t.timestamps
    end
  end
end
