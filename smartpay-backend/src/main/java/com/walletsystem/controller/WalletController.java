package com.walletsystem.controller;

import com.walletsystem.model.Wallet;
import com.walletsystem.model.dto.ApiResponse;
import com.walletsystem.model.dto.TransferRequest;
import com.walletsystem.service.UserService;
import com.walletsystem.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Wallet Controller demonstrating REST API endpoints
 * Uses encapsulation and polymorphism
 */
@RestController
@RequestMapping("/api/wallet")
@Tag(name = "Wallet Management", description = "APIs for wallet operations")
public class WalletController {
    
    @Autowired
    private WalletService walletService;
    
    @Autowired
    private UserService userService;
    
    /**
     * Get wallet balance
     * GET /api/wallet/balance/{userId}
     */
    @GetMapping("/balance/{userId}")
    @Operation(summary = "Get wallet balance", description = "Get wallet balance for a user")
    public ResponseEntity<ApiResponse<Wallet>> getWalletBalance(@PathVariable String userId) {
        try {
            Wallet wallet = walletService.getWalletBalance(userId);
            return ResponseEntity.ok(ApiResponse.success("Balance retrieved successfully", wallet));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * Add funds to wallet
     * POST /api/wallet/addFunds
     */
    @PostMapping("/addFunds")
    @Operation(summary = "Add funds to wallet", description = "Add random amount to wallet balance")
    public ResponseEntity<ApiResponse<Wallet>> addFunds(
            @RequestHeader("Authorization") String token,
            @RequestParam double amount) {
        try {
            // Validate token and get user
            userService.validateToken(token);
            
            // For demo purposes, we'll use a random amount if not specified
            double randomAmount = amount > 0 ? amount : 100 + (Math.random() * 500);
            
            Wallet wallet = walletService.addFunds(userService.validateToken(token).getId(), randomAmount);
            return ResponseEntity.ok(ApiResponse.success("Funds added successfully", wallet));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }
    }
    
    /**
     * Transfer funds between users
     * POST /api/wallet/transfer
     */
    @PostMapping("/transfer")
    @Operation(summary = "Transfer funds", description = "Transfer funds between users")
    public ResponseEntity<ApiResponse<com.walletsystem.model.Transaction>> transferFunds(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody TransferRequest request) {
        try {
            // Validate token
            userService.validateToken(token);
            
            com.walletsystem.model.Transaction transaction = walletService.transferFunds(request);
            return ResponseEntity.ok(ApiResponse.success("Transfer completed successfully", transaction));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.BAD_REQUEST.value()));
        }
    }
    
    /**
     * Get all wallets (admin endpoint)
     * GET /api/wallet/all
     */
    @GetMapping("/all")
    @Operation(summary = "Get all wallets", description = "Get all wallets (admin only)")
    public ResponseEntity<ApiResponse<java.util.List<Wallet>>> getAllWallets() {
        try {
            java.util.List<Wallet> wallets = walletService.getAllWallets();
            return ResponseEntity.ok(ApiResponse.success("Wallets retrieved successfully", wallets));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
