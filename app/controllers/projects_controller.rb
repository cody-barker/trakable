class ProjectsController < ApplicationController
    skip_before_action :find_user_by_session_id

    def index
        render json: Project.all
    end

    def create
        project = Project.create!(project_params)
        render json: project, status: :created
    end

    def destroy
        project = Project.find(params[:id])
        project.destroy
        render json: project, status: :ok
    end

    private
    
    def project_params
        params.permit(
            :name,
            :description
        )
    end
end
