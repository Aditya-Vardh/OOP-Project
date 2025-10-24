package com.walletsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * User model class demonstrating encapsulation
 * Extends BaseEntity to show inheritance
 */
public class User extends BaseEntity {
    private String username;
    private String email;
    private String password;
    private String token;
    private boolean isActive;

    public User() {
        super();
    }

    public User(String id, String username, String email, String password) {
        super(id);
        this.username = username;
        this.email = email;
        this.password = password;
        this.isActive = true;
    }

    // Encapsulation - private fields with public getters/setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String getEntityType() {
        return "USER";
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }
}
