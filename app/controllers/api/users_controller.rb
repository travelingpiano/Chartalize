class Api::UsersController < ApplicationController
  def index
    all_users = User.all
    @users = all_users.select{|user| user.id != current_user.id}
    render :index
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      errors = @user.errors.full_messages
      render json: errors, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username,:password)
  end
end
