class User < ApplicationRecord
    has_secure_password
    has_many :tasks
    has_many :projects,  -> { distinct }, through: :tasks
    has_many :teams,  -> { distinct }, through: :tasks

    validates :first_name, presence: true, length: {minimum: 1}
    validates :last_name, presence: true, length: {minimum: 1}
    validates :email, presence: true
    validates :email, uniqueness: true
    validates :email, format: {without: /\s/, message: "cannot contain spaces"}
    validates :password, length: {minimum: 4, maximum: 16}, format: {without: /\s/, message: "cannot contain spaces"}

end
