class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password])

    if @user
      login(user)
      render 'api/users/show'
    else
      render json: @user.errors.full_messages, status: 422
  end

  def destroy
    user = User.find(params[:id])
    logout(user)
    render "api/"
  end
end
