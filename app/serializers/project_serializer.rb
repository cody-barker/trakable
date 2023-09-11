class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :creator_id
  has_many :tasks
  has_many :users
 
end
