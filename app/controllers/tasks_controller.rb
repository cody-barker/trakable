class TasksController < ApplicationController
    def index
        render json: Task.all
    end

    def create
        user = find_user_by_session_id
        tasks = user.tasks.create!(task_params)
        render json: task, status: :created
    end

    private

    def task_params
        params.permit(
            :id,
            :name,
            :due_date,
            :description,
            :project_id,
            :team_id
        )
    end

end
