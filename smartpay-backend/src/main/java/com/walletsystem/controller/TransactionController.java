package com.walletsystem.controller;

import com.walletsystem.model.Transaction;
import com.walletsystem.model.dto.ApiResponse;
import com.walletsystem.service.TransactionService;
import com.walletsystem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Transaction Controller demonstrating REST API endpoints
 * Uses encapsulation and polymorphism
 */
@RestController
@RequestMapping("/api/transaction")
@Tag(name = "Transaction Management", description = "APIs for transaction operations")
public class TransactionController {
    
    @Autowired
    private TransactionService transactionService;
    
    @Autowired
    private UserService userService;
    
    /**
     * Get transaction history for a user
     * GET /api/transaction/history/{userId}
     */
    @GetMapping("/history/{userId}")
    @Operation(summary = "Get transaction history", description = "Get transaction history for a user")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionHistory(@PathVariable String userId) {
        try {
            List<Transaction> transactions = transactionService.getTransactionHistory(userId);
            return ResponseEntity.ok(ApiResponse.success("Transaction history retrieved successfully", transactions));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * Get transaction by ID
     * GET /api/transaction/{transactionId}
     */
    @GetMapping("/{transactionId}")
    @Operation(summary = "Get transaction by ID", description = "Get specific transaction details")
    public ResponseEntity<ApiResponse<Transaction>> getTransactionById(@PathVariable String transactionId) {
        try {
            Transaction transaction = transactionService.getTransactionById(transactionId);
            if (transaction == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Transaction not found", HttpStatus.NOT_FOUND.value()));
            }
            return ResponseEntity.ok(ApiResponse.success("Transaction retrieved successfully", transaction));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * Get all transactions (admin endpoint)
     * GET /api/transaction/all
     */
    @GetMapping("/all")
    @Operation(summary = "Get all transactions", description = "Get all transactions (admin only)")
    public ResponseEntity<ApiResponse<List<Transaction>>> getAllTransactions() {
        try {
            List<Transaction> transactions = transactionService.getAllTransactions();
            return ResponseEntity.ok(ApiResponse.success("All transactions retrieved successfully", transactions));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * Get transactions by type
     * GET /api/transaction/type/{type}
     */
    @GetMapping("/type/{type}")
    @Operation(summary = "Get transactions by type", description = "Get transactions filtered by type (CREDIT, DEBIT, TRANSFER)")
    public ResponseEntity<ApiResponse<List<Transaction>>> getTransactionsByType(@PathVariable String type) {
        try {
            Transaction.TransactionType transactionType = Transaction.TransactionType.valueOf(type.toUpperCase());
            List<Transaction> transactions = transactionService.getTransactionsByType(transactionType);
            return ResponseEntity.ok(ApiResponse.success("Transactions retrieved successfully", transactions));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid transaction type", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
