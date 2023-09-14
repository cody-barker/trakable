class Task < ApplicationRecord
    belongs_to :user
    belongs_to :project
    belongs_to :team

    validates :name, presence: true
    validates :team_id, presence: true
    validates :project_id, presence: true
    validates :team_id, numericality: {only_integer: true}
    validates :project_id, numericality: {only_integer: true}
end
