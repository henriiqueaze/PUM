package com.PUM.transfer.DTOs;

public class UserCredentialsDTO {

    private String userName;
    private String password;

    public UserCredentialsDTO() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
