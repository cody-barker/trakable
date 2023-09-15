class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :title, :email, :projects, :teams
  
  # has_many :tasks
  has_many :projects
  has_many :teams

end
