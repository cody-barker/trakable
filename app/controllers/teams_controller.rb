class TeamsController < ApplicationController
    skip_before_action :authorize, only: :index
    
    def index
        render json: Team.all
    end

    def create
        team = Team.create!(team_params)
        team.auth_users = [session[:user_id]]
        team.creator_id = session[:user_id]
        team.save
        render json: team, status: :created
    end

    private

    def team_params
        params.permit(
            :name,
            :description,
            :creator_id,
            auth_users: []
        )
    end
end
