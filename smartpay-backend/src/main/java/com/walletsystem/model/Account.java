package com.walletsystem.model;

/**
 * Base Account class demonstrating inheritance
 * Contains common account functionality
 */
public abstract class Account {
    protected String accountId;
    protected String userId;
    protected double balance;
    protected String accountType;

    public Account() {
    }

    public Account(String accountId, String userId, double balance, String accountType) {
        this.accountId = accountId;
        this.userId = userId;
        this.balance = balance;
        this.accountType = accountType;
    }

    // Encapsulation
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    // Abstract methods for polymorphism
    public abstract boolean canWithdraw(double amount);
    public abstract boolean canDeposit(double amount);
    public abstract String getAccountDetails();
}
