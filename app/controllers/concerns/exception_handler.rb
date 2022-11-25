module ExceptionHandler
  extend ActiveSupport::Concern
  included do
    # データ取得に失敗しました場合の例外処理
    rescue_from SelectException do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, "request start", e.message) { logger.error }
      
      # M060: "データ取得に失敗しました。"
      render json: {message: "M060"}
    end

    # データ更新に失敗した場合の例外処理
    rescue_from UpdateException do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, "更新したid: #{e.updateId}","更新データ：#{e.updateData}", e.message) { logger.error }
      
      # M058: "データ更新に失敗しました。"
      render json: {message: "M058"}
    end

    # データ削除に失敗した場合の例外処理
    rescue_from DeleteException do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, "削除したid: #{e.deleteId}", "削除データ：#{e.deleteData}", e.message) { logger.error }

      # M059: "データ削除に失敗しました。"
      render json: {message: "M059"}
    end

    # データ登録に失敗した場合の場合の例外処理
    rescue_from InsertException do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, "登録データ：#{e.insertData}", e.message) { logger.error }
      
      # M056: "データ登録に失敗しました。"
      render json: {message: "M056"}
    end

    # データチェックに失敗した場合の場合の例外処理
    rescue_from CheckException do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, "登録データ：#{e.insertData}", e.message) { logger.error }
      
      # M062: "データ登録に失敗しました。"
      render json: {message: "M062"}
    end

    # 操作を実行する権限がない場合の例外処理
    rescue_from Pundit::NotAuthorizedError do |e|
      # ログ出力する
      logger.tagged(request.url, current_user.user_name, e.message) { logger.error }
      
      # M061: この操作を実行する権限がありません。
      render json: {message: "M061"} 
    end
  end
end