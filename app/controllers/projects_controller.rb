class ProjectsController < ApplicationController
    skip_before_action :find_user_by_session_id

    def index
        render json: Project.all
    end

    def create
        if (params[:creator_id] === session[:user_id])
            project = Project.create!(project_params)
            render json: project, status: :created
        else
            render json: {errors: ["Unauthorized"]}, status: :unauthorized
        end
    end

    private
    
    def project_params
        params.permit(
            :name,
            :description,
            :creator_id
        )
    end
end
