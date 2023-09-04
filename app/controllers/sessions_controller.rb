class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy]
    
        def create
            user = User.find_by(email: params[:email])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: {error: "Incorrect email or password"}, status: :unauthorized
            end
        end
    
        def destroy
            session.delete(:user_id)
            render json: {}, status: :no_content
        end
    end
    
end
