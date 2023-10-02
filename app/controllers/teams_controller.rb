class TeamsController < ApplicationController
    skip_before_action :find_user_by_session_id
    before_action :authorize_creator, only: [:create, :update]

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

    def update
            team = Team.find(params[:id])
            team.update!(team_params)
            render json: team, status: :accepted
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

    def authorize_creator
        if params[:creator_id] != session[:user_id]
            render json: { errors: ["Unauthorized"] }, status: :unauthorized
        end
    end
end
