class Team < ApplicationRecord
    has_many :tasks
    has_many :users, -> { distinct }, through: :tasks
    has_many :projects, -> { distinct }, through: :tasks

    validates :name, presence: true
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 200}
end
