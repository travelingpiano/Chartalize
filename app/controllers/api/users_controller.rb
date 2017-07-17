class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      @user.errors = @user.errors.full_messages
      render json: @user.errors, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username,:password)
  end
end
