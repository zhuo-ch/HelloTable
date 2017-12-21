class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :current_session, :logged_in?

  def current_user
    user = User.find_by(session_token: session[:session_token])
  end

  def current_session
    user = User.find_session(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    user.session_token = user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout(user)
    user.session_token = user.reset_session_token!
    session[:session_token] = nil
  end
end
