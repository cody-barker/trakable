class Task < ApplicationRecord
    belongs_to :user
    belongs_to :project
    belongs_to :workspace
    
    validates :name, presence: true
end
