class ProjectsController < ApplicationController

    def index
        render json: Project.all
    end

    def create
        project = Project.create!(project_params)
        render json: project, status: :created
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
