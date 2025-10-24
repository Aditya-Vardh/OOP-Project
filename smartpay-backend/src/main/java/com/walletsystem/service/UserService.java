package com.walletsystem.service;

import com.walletsystem.model.User;
import com.walletsystem.model.dto.UserLoginRequest;
import com.walletsystem.model.dto.UserRegistrationRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * User Service demonstrating business logic and mock data management
 * Uses encapsulation and polymorphism
 */
@Service
public class UserService {
    
    // In-memory storage using ConcurrentHashMap for thread safety
    private final Map<String, User> users = new ConcurrentHashMap<>();
    private final Map<String, String> userTokens = new ConcurrentHashMap<>();
    
    /**
     * Register a new user with mock random ID generation
     * Demonstrates encapsulation and business logic
     */
    public User registerUser(UserRegistrationRequest request) {
        // Generate random user ID
        String userId = "USR" + (int)(Math.random() * 10000);
        
        // Check if username already exists
        if (isUsernameExists(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        // Create new user
        User user = new User(userId, request.getUsername(), request.getEmail(), request.getPassword());
        
        // Generate mock token
        String token = "Bearer mock-token-" + (int)(Math.random() * 10000);
        user.setToken(token);
        
        // Store user
        users.put(userId, user);
        userTokens.put(token, userId);
        
        return user;
    }
    
    /**
     * Login user with mock authentication
     * Demonstrates polymorphism and business logic
     */
    public User loginUser(UserLoginRequest request) {
        // Find user by username
        User user = findUserByUsername(request.getUsername());
        
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        // Mock password validation (always succeeds for demo)
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Generate new token
        String token = "Bearer mock-token-" + (int)(Math.random() * 10000);
        user.setToken(token);
        userTokens.put(token, user.getId());
        
        return user;
    }
    
    /**
     * Find user by ID
     * Demonstrates encapsulation
     */
    public User findUserById(String userId) {
        return users.get(userId);
    }
    
    /**
     * Find user by username
     * Demonstrates encapsulation
     */
    public User findUserByUsername(String username) {
        return users.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
    
    /**
     * Validate token and get user
     * Demonstrates business logic
     */
    public User validateToken(String token) {
        String userId = userTokens.get(token);
        if (userId == null) {
            throw new RuntimeException("Invalid token");
        }
        return users.get(userId);
    }
    
    /**
     * Check if username exists
     * Demonstrates encapsulation
     */
    private boolean isUsernameExists(String username) {
        return users.values().stream()
                .anyMatch(user -> user.getUsername().equals(username));
    }
    
    /**
     * Get all users (for admin purposes)
     * Demonstrates encapsulation
     */
    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }
}
