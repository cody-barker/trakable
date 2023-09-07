class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :due_date, :description, :user_id, :project_id, :team_id
  belongs_to :user
  belongs_to :project
end
