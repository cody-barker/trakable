class Team < ApplicationRecord
    has_many :tasks
    has_many :users, -> { distinct }, through: :tasks
    has_many :projects, -> { distinct }, through: :tasks

    validates :name, presence: true
    validates :name, uniqueness: true
    validates :name, length: {maximum: 30}
    validates :description, length: {maximum: 200}

    validate :unique_auth_users

    private
    def unique_auth_users
        if auth_users.uniq.length != auth_users.length
          errors.add(:auth_users, "This user is already a member of the team.")
        end
    end

end
