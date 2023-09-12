class WorkspaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :creator_id
  has_many :tasks
  has_many :users
  has_many :projects
end
