class Project < ApplicationRecord
    has_many :tasks, dependent: :delete_all
    has_many :users, through: :tasks
    validates :name, presence: true
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 200}
end
