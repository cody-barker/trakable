class TeamsController < ApplicationController
    def index
        render json: Team.all
    end

    def create
        team = Team.create!(team_params)
        render json: team, status: :accepted
    end

    private

    def team_params
        params.permit(
            :name,
            :description,
            :creator_id
        )
    end
end
