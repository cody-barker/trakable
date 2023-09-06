class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :due_date, :description, :user_id, :peroject_id, :team_id
  belongs_to :user
end
