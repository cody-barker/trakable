class Task < ApplicationRecord
    belongs_to :user
    belongs_to :project
    belongs_to :team

    validates :name, presence: true
end
