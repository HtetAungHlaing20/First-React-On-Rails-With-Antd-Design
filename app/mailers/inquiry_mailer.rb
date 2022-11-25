class InquiryMailer < ApplicationMailer
    def send_mail(sendMailInfo, memberInfo, statusInfo, reviewComment, frontUserInfo, current_user)
      subjectBody = self.subBodyInfo('MAIL_SUBJECT_HOUSHIKAKUNINIRAI', 'MAIL_BODY_HOUSHIKAKUNINIRAI')
      name = sendMailInfo.take.user_name
      lastName = sendMailInfo.take.user_name_last
      reviewComment = reviewComment
      writingKeyword = memberInfo.take.writing_keyword
      outlineStatus = statusInfo.take.outline_status
      loginUser = current_user.user_name
      projectName = frontUserInfo.take.project_name
      subject = subjectBody[0].description
      about = subjectBody[1].description   
      @subject = subject % {p: projectName, k: writingKeyword, s: outlineStatus}
      @about = about % {r: name, k: writingKeyword, s: outlineStatus, c: reviewComment, l: loginUser}
      mail(
        to: sendMailInfo.take.email,
        subject: @subject)
    end

    def subBodyInfo(subject, body)
      subBody = Config
      .select("description")
      .where("configs.key = ? OR configs.key = ? AND configs.del_flg = 0", subject, body).order(id: :asc)
      return subBody
    end

end
