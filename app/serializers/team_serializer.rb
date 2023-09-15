class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :creator_id, :tasks

  has_many :users
  has_many :tasks
  has_many :projects
end
