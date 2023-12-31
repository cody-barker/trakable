class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy]
    skip_before_action :find_user_by_session_id
    
        def create
            user = User.find_by(email: params[:email])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: {errors: ["Incorrect email or password"]}, status: :unauthorized
            end
        end
    
        def destroy
            session.delete(:user_id)
            render json: {}, status: :ok
        end
end
