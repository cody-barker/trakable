class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.date :due_date
      t.string :description
      t.integer :user_id
      t.integer :project_id
      t.integer :team_id

      t.timestamps
    end
  end
end
