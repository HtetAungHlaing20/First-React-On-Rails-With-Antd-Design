class Api::V1::UserController < ApplicationController
  def index
    @users = User.all
    @userLevel = UserLevel.all
    logger.info "User *** #{@userLevel.inspect}"
    puts "My Data User is  #{@users.inspect}"
    render json: {users: @users}
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

   # idでサンプル情報表示処理
   def show
    render json: @user
  end

  def new
    @user = User.new
  end

  def update
  end

  def destroy 
  end
end