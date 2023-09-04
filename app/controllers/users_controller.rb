class UsersController < ApplicationController

    def index
        render json: User.all
    end

    def show
        user = User.find_by(id: sessions[:user_id])
        render json: user, status: :created
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
            :password_confirmation
        )
    end



end
