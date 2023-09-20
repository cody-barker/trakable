class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :title, :email, :projects, :teams
  
  # has_many :tasks
  has_many :projects
  has_many :teams

  def username
    "#{self.object.first_name}  #{self.object.last_name}"
  end

end
