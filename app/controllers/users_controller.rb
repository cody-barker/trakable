class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
    skip_before_action :find_user_by_session_id, only: [:index, :create]

    def index
        render json: User.all
    end

    def show
        render json: @user, status: :created
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(
            :first_name,
            :last_name,
            :title,
            :email,
            :password,
            :password_confirmation,
            :user
        )
    end
end
