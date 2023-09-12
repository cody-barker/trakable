class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :due_date, :description, :user_id, :project_id, :team_id, :project_name, :team_name
  
  belongs_to :user
  belongs_to :project
  belongs_to :team

  def project_name
    self.object.project.name
  end

  def team_name
    self.object.team.name
  end
end
