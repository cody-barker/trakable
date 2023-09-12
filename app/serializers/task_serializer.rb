class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :due_date, :description, :user_id, :project_id, :workspace_id, :project_name
  belongs_to :user
  belongs_to :project
  belongs_to :workspace

  def project_name
    self.object.project.name
  end
end
