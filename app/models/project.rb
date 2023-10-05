class Project < ApplicationRecord
    has_many :tasks, dependent: :delete_all
    has_many :users, -> { distinct }, through: :tasks
    has_many :teams, -> { distinct }, through: :tasks

    validates :name, presence: true
    validates :name, length: {maximum: 30}
    validates :name, uniqueness: true
    validates :description, length: {maximum: 200}
end
