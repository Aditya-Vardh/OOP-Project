package com.walletsystem.service;

import com.walletsystem.model.Transaction;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Transaction Service demonstrating business logic and mock data
 * Uses encapsulation and polymorphism
 */
@Service
public class TransactionService {
    
    // In-memory storage for transactions
    private final Map<String, Transaction> transactions = new ConcurrentHashMap<>();
    private final Map<String, List<String>> userTransactions = new ConcurrentHashMap<>();
    
    /**
     * Add a new transaction
     * Demonstrates encapsulation
     */
    public Transaction addTransaction(Transaction transaction) {
        transactions.put(transaction.getTransactionId(), transaction);
        
        // Add to user transaction lists
        if (transaction.getSenderId() != null) {
            userTransactions.computeIfAbsent(transaction.getSenderId(), k -> new ArrayList<>())
                    .add(transaction.getTransactionId());
        }
        if (transaction.getReceiverId() != null) {
            userTransactions.computeIfAbsent(transaction.getReceiverId(), k -> new ArrayList<>())
                    .add(transaction.getTransactionId());
        }
        
        return transaction;
    }
    
    /**
     * Get transaction history for a user
     * Demonstrates polymorphism and business logic
     */
    public List<Transaction> getTransactionHistory(String userId) {
        List<String> userTransactionIds = userTransactions.get(userId);
        
        if (userTransactionIds == null || userTransactionIds.isEmpty()) {
            // Generate mock transaction history
            return generateMockTransactionHistory(userId);
        }
        
        return userTransactionIds.stream()
                .map(transactions::get)
                .filter(Objects::nonNull)
                .sorted((t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp()))
                .collect(Collectors.toList());
    }
    
    /**
     * Generate mock transaction history
     * Demonstrates polymorphism and business logic
     */
    private List<Transaction> generateMockTransactionHistory(String userId) {
        List<Transaction> mockTransactions = new ArrayList<>();
        int transactionCount = 5 + (int)(Math.random() * 6); // 5-10 transactions
        
        for (int i = 0; i < transactionCount; i++) {
            String transactionId = "TXN" + (int)(Math.random() * 10000);
            double amount = 50 + (Math.random() * 500); // Random amount between 50-550
            Transaction.TransactionType type = Math.random() < 0.5 ? 
                Transaction.TransactionType.CREDIT : Transaction.TransactionType.DEBIT;
            
            String senderId = type == Transaction.TransactionType.CREDIT ? "SYSTEM" : userId;
            String receiverId = type == Transaction.TransactionType.CREDIT ? userId : "MERCHANT" + (int)(Math.random() * 100);
            
            Transaction transaction = new Transaction(
                transactionId,
                senderId,
                receiverId,
                amount,
                type,
                generateMockDescription(type)
            );
            
            // Set random timestamp within last 30 days
            LocalDateTime randomTime = LocalDateTime.now().minusDays((int)(Math.random() * 30));
            transaction.setTimestamp(randomTime);
            
            mockTransactions.add(transaction);
            addTransaction(transaction);
        }
        
        return mockTransactions.stream()
                .sorted((t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp()))
                .collect(Collectors.toList());
    }
    
    /**
     * Generate mock description based on transaction type
     * Demonstrates polymorphism
     */
    private String generateMockDescription(Transaction.TransactionType type) {
        String[] creditDescriptions = {
            "Salary deposit", "Refund received", "Cashback reward", 
            "Interest earned", "Bonus payment", "Funds received"
        };
        
        String[] debitDescriptions = {
            "Grocery shopping", "Restaurant payment", "Online purchase",
            "Utility bill", "Transportation", "Entertainment"
        };
        
        String[] descriptions = type == Transaction.TransactionType.CREDIT ? 
            creditDescriptions : debitDescriptions;
        
        return descriptions[(int)(Math.random() * descriptions.length)];
    }
    
    /**
     * Get transaction by ID
     * Demonstrates encapsulation
     */
    public Transaction getTransactionById(String transactionId) {
        return transactions.get(transactionId);
    }
    
    /**
     * Get all transactions (for admin purposes)
     * Demonstrates encapsulation
     */
    public List<Transaction> getAllTransactions() {
        return new ArrayList<>(transactions.values());
    }
    
    /**
     * Get transactions by type
     * Demonstrates polymorphism
     */
    public List<Transaction> getTransactionsByType(Transaction.TransactionType type) {
        return transactions.values().stream()
                .filter(transaction -> transaction.getType() == type)
                .sorted((t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp()))
                .collect(Collectors.toList());
    }
}
