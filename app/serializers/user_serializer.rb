class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :title, :email, :password_digest
end
