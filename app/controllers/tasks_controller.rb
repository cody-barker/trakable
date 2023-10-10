class TasksController < ApplicationController
    skip_before_action :find_user_by_session_id, only: [:index]

    def index
        render json: Task.all
    end

    def create
        task = @user.tasks.create!(task_params)
        render json: task, method: [:project_name, :team_name], status: :created
    end

    def update
        task = @user.tasks.find(params[:id])
        task.update!(task_params)
        render json: task, status: :accepted
    end

    def destroy
        task = @user.tasks.find(params[:id])
        task.destroy
        render json: task, status: :ok
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
