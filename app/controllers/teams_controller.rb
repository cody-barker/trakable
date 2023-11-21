class TeamsController < ApplicationController
    skip_before_action :find_user_by_session_id

    def index
        render json: Team.all
    end

    def create
        team = Team.create!(team_params)
        render json: team, status: :created
    end

    def destroy
        team = Team.find(params[:id])
        team.destroy
        render json: team, status: :ok
    end

    private

    def team_params
        params.permit(
            :name,
            :description
        )
    end

end
