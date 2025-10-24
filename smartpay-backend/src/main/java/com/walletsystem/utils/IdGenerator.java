package com.walletsystem.utils;

/**
 * Utility class for generating random IDs
 * Demonstrates encapsulation and utility methods
 */
public class IdGenerator {
    
    /**
     * Generate random user ID
     * Demonstrates encapsulation
     */
    public static String generateUserId() {
        return "USR" + (int)(Math.random() * 10000);
    }
    
    /**
     * Generate random transaction ID
     * Demonstrates encapsulation
     */
    public static String generateTransactionId() {
        return "TXN" + (int)(Math.random() * 10000);
    }
    
    /**
     * Generate random wallet ID
     * Demonstrates encapsulation
     */
    public static String generateWalletId() {
        return "WLT" + (int)(Math.random() * 10000);
    }
    
    /**
     * Generate random token
     * Demonstrates encapsulation
     */
    public static String generateToken() {
        return "Bearer mock-token-" + (int)(Math.random() * 10000);
    }
    
    /**
     * Generate random balance between min and max
     * Demonstrates encapsulation
     */
    public static double generateRandomBalance(double min, double max) {
        return min + (Math.random() * (max - min));
    }
}
