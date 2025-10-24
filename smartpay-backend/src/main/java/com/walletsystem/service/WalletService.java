package com.walletsystem.service;

import com.walletsystem.model.Transaction;
import com.walletsystem.model.Wallet;
import com.walletsystem.model.dto.TransferRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Wallet Service demonstrating business logic and mock data
 * Uses inheritance, polymorphism, and encapsulation
 */
@Service
public class WalletService {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TransactionService transactionService;
    
    // In-memory storage for wallets
    private final Map<String, Wallet> wallets = new ConcurrentHashMap<>();
    
    /**
     * Get wallet balance for a user
     * Demonstrates encapsulation and business logic
     */
    public Wallet getWalletBalance(String userId) {
        Wallet wallet = wallets.get(userId);
        
        if (wallet == null) {
            // Create new wallet with random balance
            wallet = createNewWallet(userId);
        }
        
        return wallet;
    }
    
    /**
     * Add funds to wallet
     * Demonstrates polymorphism and business logic
     */
    public Wallet addFunds(String userId, double amount) {
        Wallet wallet = getWalletBalance(userId);
        
        if (wallet.canDeposit(amount)) {
            wallet.addFunds(amount);
            
            // Create transaction record
            Transaction transaction = new Transaction(
                "TXN" + (int)(Math.random() * 10000),
                "SYSTEM",
                userId,
                amount,
                Transaction.TransactionType.CREDIT,
                "Funds added to wallet"
            );
            transactionService.addTransaction(transaction);
        } else {
            throw new RuntimeException("Invalid amount for deposit");
        }
        
        return wallet;
    }
    
    /**
     * Transfer funds between users
     * Demonstrates polymorphism and business logic
     */
    public Transaction transferFunds(TransferRequest request) {
        Wallet senderWallet = getWalletBalance(request.getSenderId());
        Wallet receiverWallet = getWalletBalance(request.getReceiverId());
        
        // Check if sender has sufficient funds
        if (!senderWallet.canWithdraw(request.getAmount())) {
            throw new RuntimeException("Insufficient funds");
        }
        
        // Perform transfer
        if (senderWallet.transferTo(receiverWallet, request.getAmount())) {
            // Create transaction record
            Transaction transaction = new Transaction(
                "TXN" + (int)(Math.random() * 10000),
                request.getSenderId(),
                request.getReceiverId(),
                request.getAmount(),
                Transaction.TransactionType.TRANSFER,
                request.getDescription() != null ? request.getDescription() : "Fund transfer"
            );
            
            transactionService.addTransaction(transaction);
            return transaction;
        } else {
            throw new RuntimeException("Transfer failed");
        }
    }
    
    /**
     * Create new wallet with random balance
     * Demonstrates encapsulation and inheritance
     */
    private Wallet createNewWallet(String userId) {
        // Generate random balance between 1000 and 10000
        double randomBalance = 1000 + (Math.random() * 9000);
        
        String walletId = "WLT" + (int)(Math.random() * 10000);
        Wallet wallet = new Wallet(walletId, userId, randomBalance, "Main Wallet");
        
        wallets.put(userId, wallet);
        return wallet;
    }
    
    /**
     * Get all wallets (for admin purposes)
     * Demonstrates encapsulation
     */
    public List<Wallet> getAllWallets() {
        return new ArrayList<>(wallets.values());
    }
}
