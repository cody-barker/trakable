class Project < ApplicationRecord
    has_many :tasks, dependent: :delete_all
    has_many :users, through: :tasks
    has_many :teams, through: :tasks

    validates :name, presence: true
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 200}
    validates :creator_id, presence: true
end
