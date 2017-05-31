package com.simplevat.entity;

public enum MailEnum {


    FORGOT_PASSWORD("Forgot your password? Don't worry",
            "<p>Dear ${user},</p><br/><p> Your password is reset successfully, your new password is : <pre>${newPassword}</pre> </p> <br/> Thank you.");

    private String subject;
    private String body;

    MailEnum(String subject, String body) {
        this.subject = subject;
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }
}
