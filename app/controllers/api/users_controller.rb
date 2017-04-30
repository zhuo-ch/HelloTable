class Api::UsersController < ApplicationController

  # def index
  #   @user = User.find_by_credentials(email: params[:user][:email], password: )
  # end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)

      render "api/users/show"
    else
      render json: {base: @user.errors.full_messages }, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  
    if @user && @user == current_user
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
