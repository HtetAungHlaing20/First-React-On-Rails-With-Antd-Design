
class Api::V1::HeaderClassificationDictController < ApplicationController
  skip_before_action :verify_authenticity_token
    def index
    end

    def load
      @header_classification_dicts = HeaderClassificationDict.where(del_flg:0).order('display_order Asc');
      render json:  @header_classification_dicts
    end
  
    def create
      begin
        @header_classification_dict = HeaderClassificationDict.new(header_classification_dict_params);
        @header_classification_dict.created_user = 1
        @header_classification_dict.updated_user = 1
        @header_classification_dict.del_flg = 0
        @header_classification_dict.save
        render  json: @header_classification_dict
        rescue ActiveRecord::RecordNotFound => e  
        render json: {
          error: "No Data",message:"データ登録に失敗しました。",errStatus:"1",messageType:"error"
        }, status: :ok 
        rescue => e
        render json: {
          error: "DB Error",message:"データ登録に失敗しました。",errStatus:"1",messageType:"error"
        }, status: :ok   
        end
    end

    def update
        @header_classification_dict = HeaderClassificationDict.find(params[:id])
        if @header_classification_dict.del_flg==0
          @header_classification_dict.updated_user=2
          @header_classification_dict.update(header_classification_dict_params)
          render json:  @header_classification_dict
        else
          render json: {
            error: "DB Error",message:"データ更新に失敗しました。",errStatus:"1",messageType:"error"
          }, status: :ok 
        end
    end

    def header_classification_dict_params
      params.require(:header_classification_dict).permit(:id, :display_order, :header_classification, :keyword)
    end

    def destroy
      begin
      @header_classification_dict = HeaderClassificationDict.find(params[:id]) 
      @header_classification_dict.del_flg = 1
      @header_classification_dict.updated_user=3
      @header_classification_dict.update(header_classification_dict_params);
      render json:  @header_classification_dict
      rescue ActiveRecord::RecordNotFound => e  
      render json: {
        error: "No Data",message:"データ削除に失敗しました。",errStatus:"1",messageType:"error"
      }, status: :ok 
      rescue => e
      render json: {
        error: "DB Error",message:"データ削除に失敗しました。",errStatus:"1",messageType:"error"
      }, status: :ok   
      end
    end
  end