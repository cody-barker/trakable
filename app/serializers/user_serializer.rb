class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :title, :email, :projects, :teams, :username
  
  # has_many :tasks
  has_many :projects
  has_many :teams

  def username
    "#{self.object.first_name}  #{self.object.last_name}"
  end

end
