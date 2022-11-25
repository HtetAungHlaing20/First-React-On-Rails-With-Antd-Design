# クラス名  :SampleController 
# 概要      :サンプル画面
# 作成者    :GICM
# 作成日    :2021/09/28
class Api::V1::SampleController < ApplicationController
  before_action :set_sample, only: %i[ show edit update destroy ]

  # 初期表示処理
  def index
    @samples = Sample.all
    render json: @samples
  end

  # idでサンプル情報表示処理
  def show
    render json: @sample
  end

  # 新規作成処理
  def new
    @sample = Sample.new
  end

  # 編集処理
  def edit
  end

  # データベースに新規登録処理
  def create
    @sample = Sample.create(sample_params)
    render json: @sample
  end

  # データベースに更新処理
  def update
    @sample = Sample.find(params[:id])
    if @sample.update(sample_params)
      render json: @sample
    else
      render json: @sample.errors
    end
  end

  # データベースに削除処理
  def destroy
    @sample.destroy
  end

  private
    # サンプルデータ設定処理
    def set_sample
      @sample = Sample.find(params[:id])
    end

    # サンプルデータ取得処理
    def sample_params
      params.require(:sample_params).permit(:id, :description)
    end
end