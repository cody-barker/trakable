class TeamsController < ApplicationController
    
    def index
        render json: Team.all
    end

    def create
        if (params[:creator_id] === session[:user_id])
            team = Team.create!(team_params)
            team.auth_users = [session[:user_id]]
            team.creator_id = session[:user_id]
            team.save
            render json: team, status: :created
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    def update
        if (params[:creator_id] === session[:user_id])
            team = Team.find(params[:id])
            team.update!(team_params)
            render json: team, status: :accepted
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
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
