class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true}
  after_initialize :ensure_session_token

  has_many :reservations
  has_many :reviews, through: :reservations
  has_many :restaurants, through: :reservations
  has_many :photos, through: :restaurants
  has_many :ratings, through: :restaurants
  has_many :favorites
  has_one :restaurant

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User
      .includes(:restaurant)
      .includes(reservations: [:review, :user, restaurant: [:photos, :rating, :reviews]])
      .includes(favorites: [restaurant: [:photos, :rating, :reviews]])
      .find_by(email: email)

    return user if user && user.is_password?(password)
    nil
  end

  def self.find_user(id)
    user = User
      .includes(:restaurant)
      .includes(reservations: [:review, :user, restaurant: [:photos, :rating, :reviews]])
      .includes(favorites: [restaurant: [:photos, :rating, :reviews]])
      .find(params[:id])
  end

  def self.find_session(session_token)
    user = User
      .includes(:restaurant)
      .includes(reservations: [:review, :user, restaurant: [:photos, :rating, :reviews]])
      .includes(favorites: [restaurant: [:photos, :rating, :reviews]])
      .find_by(session_token: session_token)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end
end
