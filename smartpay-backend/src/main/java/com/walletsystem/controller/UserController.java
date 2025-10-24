package com.walletsystem.controller;

import com.walletsystem.model.User;
import com.walletsystem.model.dto.ApiResponse;
import com.walletsystem.model.dto.UserLoginRequest;
import com.walletsystem.model.dto.UserRegistrationRequest;
import com.walletsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * User Controller demonstrating REST API endpoints
 * Uses encapsulation and polymorphism
 */
@RestController
@RequestMapping("/api/user")
@Tag(name = "User Management", description = "APIs for user registration and authentication")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Register a new user
     * POST /api/user/register
     */
    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Register a new user with random ID")
    public ResponseEntity<ApiResponse<User>> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            User user = userService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success("User registered successfully", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }
    }
    
    /**
     * Login user
     * POST /api/user/login
     */
    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and return token")
    public ResponseEntity<ApiResponse<User>> loginUser(@Valid @RequestBody UserLoginRequest request) {
        try {
            User user = userService.loginUser(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.UNAUTHORIZED.value()));
        }
    }
    
    /**
     * Get user profile
     * GET /api/user/profile
     */
    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Get current user profile")
    public ResponseEntity<ApiResponse<User>> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            User user = userService.validateToken(token);
            return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.UNAUTHORIZED.value()));
        }
    }
    
    /**
     * Get all users (admin endpoint)
     * GET /api/user/all
     */
    @GetMapping("/all")
    @Operation(summary = "Get all users", description = "Get all registered users (admin only)")
    public ResponseEntity<ApiResponse<java.util.List<User>>> getAllUsers() {
        try {
            java.util.List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
