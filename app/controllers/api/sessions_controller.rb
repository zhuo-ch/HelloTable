class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password])

    if @user #&& @user.is_password?(params[:user][:password])
      login(@user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    logout(current_user)
    render {}
  end
end
