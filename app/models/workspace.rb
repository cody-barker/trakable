class Workspace < ApplicationRecord
    has_many :tasks
    has_many :users, through: :tasks
    has_many :projects, through: :tasks

    validates :name, presence: true
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 200}
    validates :creator_id, presence: true
end
