class WorkspacesController < ApplicationController

    def index
        render json: Workspace.all
    end

end
