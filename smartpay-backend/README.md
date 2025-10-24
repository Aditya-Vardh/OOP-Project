# Digital Wallet System - Backend

A Spring Boot REST API backend for a Digital Wallet System that demonstrates Object-Oriented Programming principles including encapsulation, inheritance, and polymorphism.

## 🚀 Features

- **No Database Required**: Uses in-memory mock data with `Math.random()` for simulation
- **3-Layer Architecture**: Controller, Service, and Model layers
- **OOP Principles**: Encapsulation, Inheritance, and Polymorphism
- **REST API Endpoints**: Complete CRUD operations for users, wallets, and transactions
- **Mock Authentication**: Token-based authentication simulation
- **Swagger Documentation**: Interactive API documentation
- **Global Exception Handling**: Comprehensive error handling

## 🏗️ Architecture

### Model Layer (OOP Principles)
- **BaseEntity**: Abstract base class demonstrating inheritance
- **User**: Extends BaseEntity, demonstrates encapsulation
- **Account**: Abstract base class for account types
- **Wallet**: Extends Account, demonstrates inheritance and polymorphism
- **Transaction**: Extends BaseEntity, demonstrates encapsulation

### Service Layer (Business Logic)
- **UserService**: User management and authentication
- **WalletService**: Wallet operations and fund management
- **TransactionService**: Transaction history and management

### Controller Layer (REST API)
- **UserController**: User registration and authentication endpoints
- **WalletController**: Wallet balance and transfer endpoints
- **TransactionController**: Transaction history endpoints

## 🛠️ Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Spring Boot 3.2.0

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartpay-backend
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - API Base URL: `http://localhost:8080`
   - Swagger UI: `http://localhost:8080/swagger-ui.html`

## 📚 API Documentation

### Authentication
All endpoints (except registration and login) require the `Authorization` header:
```
Authorization: Bearer mock-token-1234
```

### User Management

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "USR1234",
    "username": "john_doe",
    "email": "john@example.com",
    "token": "Bearer mock-token-5678",
    "active": true,
    "createdAt": "2025-01-24T12:40:00"
  },
  "statusCode": 201
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "USR1234",
    "username": "john_doe",
    "email": "john@example.com",
    "token": "Bearer mock-token-5678",
    "active": true
  },
  "statusCode": 200
}
```

### Wallet Management

#### Get Wallet Balance
```http
GET /api/wallet/balance/USR1234
```

**Response:**
```json
{
  "success": true,
  "message": "Balance retrieved successfully",
  "data": {
    "accountId": "WLT5678",
    "userId": "USR1234",
    "balance": 5789.32,
    "accountType": "WALLET",
    "walletName": "Main Wallet",
    "currency": "USD"
  },
  "statusCode": 200
}
```

#### Add Funds
```http
POST /api/wallet/addFunds?amount=500
Authorization: Bearer mock-token-5678
```

**Response:**
```json
{
  "success": true,
  "message": "Funds added successfully",
  "data": {
    "accountId": "WLT5678",
    "userId": "USR1234",
    "balance": 6289.32,
    "accountType": "WALLET",
    "walletName": "Main Wallet",
    "currency": "USD"
  },
  "statusCode": 200
}
```

#### Transfer Funds
```http
POST /api/wallet/transfer
Authorization: Bearer mock-token-5678
Content-Type: application/json

{
  "senderId": "USR1234",
  "receiverId": "USR5678",
  "amount": 200.0,
  "description": "Payment for services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transfer completed successfully",
  "data": {
    "transactionId": "TXN1012",
    "senderId": "USR1234",
    "receiverId": "USR5678",
    "amount": 200.0,
    "type": "TRANSFER",
    "status": "COMPLETED",
    "description": "Payment for services",
    "timestamp": "2025-01-24T12:40:00"
  },
  "statusCode": 200
}
```

### Transaction Management

#### Get Transaction History
```http
GET /api/transaction/history/USR1234
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction history retrieved successfully",
  "data": [
    {
      "transactionId": "TXN1012",
      "senderId": "USR1234",
      "receiverId": "USR5678",
      "amount": 200.0,
      "type": "TRANSFER",
      "status": "COMPLETED",
      "description": "Payment for services",
      "timestamp": "2025-01-24T12:40:00"
    },
    {
      "transactionId": "TXN9091",
      "senderId": "SYSTEM",
      "receiverId": "USR1234",
      "amount": 500.0,
      "type": "CREDIT",
      "status": "COMPLETED",
      "description": "Funds added to wallet",
      "timestamp": "2025-01-24T12:35:00"
    }
  ],
  "statusCode": 200
}
```

## 🎯 OOP Principles Implementation

### 1. Encapsulation
- **Private fields** with public getters/setters in all model classes
- **Data hiding** through access modifiers
- **Controlled access** to internal state

**Example:**
```java
public class User extends BaseEntity {
    private String username;
    private String email;
    private String password;
    
    // Public getters/setters for controlled access
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
```

### 2. Inheritance
- **BaseEntity** as parent class for User and Transaction
- **Account** as parent class for Wallet
- **Code reuse** and **hierarchical structure**

**Example:**
```java
public class User extends BaseEntity {
    // Inherits id, createdAt, updatedAt from BaseEntity
    // Adds user-specific fields and methods
}

public class Wallet extends Account {
    // Inherits accountId, userId, balance from Account
    // Adds wallet-specific functionality
}
```

### 3. Polymorphism
- **Abstract methods** in BaseEntity and Account classes
- **Method overriding** in child classes
- **Interface implementation** for different behaviors

**Example:**
```java
// BaseEntity abstract method
public abstract String getEntityType();

// User implementation
@Override
public String getEntityType() {
    return "USER";
}

// Transaction implementation
@Override
public String getEntityType() {
    return "TRANSACTION";
}
```

## 🔧 Project Structure

```
smartpay-backend/
├── src/main/java/com/walletsystem/
│   ├── DigitalWalletApplication.java
│   ├── controller/
│   │   ├── UserController.java
│   │   ├── WalletController.java
│   │   └── TransactionController.java
│   ├── service/
│   │   ├── UserService.java
│   │   ├── WalletService.java
│   │   └── TransactionService.java
│   ├── model/
│   │   ├── BaseEntity.java
│   │   ├── User.java
│   │   ├── Account.java
│   │   ├── Wallet.java
│   │   ├── Transaction.java
│   │   └── dto/
│   │       ├── UserRegistrationRequest.java
│   │       ├── UserLoginRequest.java
│   │       ├── TransferRequest.java
│   │       └── ApiResponse.java
│   ├── exception/
│   │   └── GlobalExceptionHandler.java
│   ├── config/
│   │   └── SwaggerConfig.java
│   └── utils/
│       └── IdGenerator.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## 🧪 Testing the API

### Using curl commands:

1. **Register a user:**
```bash
curl -X POST http://localhost:8080/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

2. **Login user:**
```bash
curl -X POST http://localhost:8080/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

3. **Get wallet balance:**
```bash
curl -X GET http://localhost:8080/api/wallet/balance/USR1234
```

4. **Get transaction history:**
```bash
curl -X GET http://localhost:8080/api/transaction/history/USR1234
```

## 📝 Notes

- **No Database**: All data is stored in memory and will be lost on restart
- **Mock Authentication**: Tokens are generated randomly and stored in memory
- **Random Data**: All IDs, balances, and amounts are generated using `Math.random()`
- **Thread Safety**: Uses `ConcurrentHashMap` for thread-safe operations
- **Validation**: Input validation using Bean Validation annotations

## 🚀 Running the Application

1. **Start the application:**
   ```bash
   mvn spring-boot:run
   ```

2. **Access Swagger UI:**
   Open `http://localhost:8080/swagger-ui.html` in your browser

3. **Test the endpoints** using the Swagger UI or curl commands

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.
