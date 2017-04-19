class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password])
      #
    if @user #&& @user.is_password?(params[:user][:password])
      login(@user)
      render 'api/users/show'
    else
      render json: {base: "Incorrect login. Please log in"}, status: 422
    end
  end

  def destroy
    logout(current_user)
    render {}
  end
end
