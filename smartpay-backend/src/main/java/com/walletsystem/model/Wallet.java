package com.walletsystem.model;

/**
 * Wallet class demonstrating inheritance from Account
 * Implements wallet-specific functionality
 */
public class Wallet extends Account {
    private String walletName;
    private String currency;

    public Wallet() {
        super();
        this.accountType = "WALLET";
        this.currency = "USD";
    }

    public Wallet(String accountId, String userId, double balance, String walletName) {
        super(accountId, userId, balance, "WALLET");
        this.walletName = walletName;
        this.currency = "USD";
    }

    // Encapsulation
    public String getWalletName() {
        return walletName;
    }

    public void setWalletName(String walletName) {
        this.walletName = walletName;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    // Polymorphism - implementing abstract methods from Account
    @Override
    public boolean canWithdraw(double amount) {
        return amount > 0 && amount <= balance;
    }

    @Override
    public boolean canDeposit(double amount) {
        return amount > 0;
    }

    @Override
    public String getAccountDetails() {
        return String.format("Wallet: %s (ID: %s) - Balance: %.2f %s", 
                walletName, accountId, balance, currency);
    }

    // Wallet-specific methods
    public boolean transferTo(Wallet targetWallet, double amount) {
        if (canWithdraw(amount) && targetWallet.canDeposit(amount)) {
            this.balance -= amount;
            targetWallet.balance += amount;
            return true;
        }
        return false;
    }

    public void addFunds(double amount) {
        if (canDeposit(amount)) {
            this.balance += amount;
        }
    }

    @Override
    public String toString() {
        return "Wallet{" +
                "accountId='" + accountId + '\'' +
                ", userId='" + userId + '\'' +
                ", balance=" + balance +
                ", walletName='" + walletName + '\'' +
                ", currency='" + currency + '\'' +
                '}';
    }
}
