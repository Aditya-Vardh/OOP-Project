// Utility functions for generating random user data

export function generateRandomCardNumber(): string {
  const digits = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10));
  return digits.join('').replace(/(\d{4})(?=\d)/g, '$1 ');
}

export function generateRandomBalance(): number {
  // Generate balance between 1000 and 50000
  return Math.floor(Math.random() * 49000) + 1000;
}

export function generateRandomTransactions() {
  const transactionTypes = [
    { type: 'Transfer to', name: 'Suresh Kumar', amount: -50, time: 'Today at 2:30 PM' },
    { type: 'Received from', name: 'Ramesh Sharma', amount: 100, time: 'Yesterday at 10:15 AM' },
    { type: 'Wallet Top-up', name: '', amount: 500, time: '2 days ago' },
    { type: 'Payment to', name: 'Amazon', amount: -250, time: '3 days ago' },
    { type: 'Received from', name: 'Priya Singh', amount: 75, time: '4 days ago' },
    { type: 'Transfer to', name: 'John Doe', amount: -150, time: '5 days ago' },
    { type: 'Cashback', name: '', amount: 25, time: '1 week ago' },
    { type: 'Refund from', name: 'Flipkart', amount: 300, time: '1 week ago' }
  ];

  // Shuffle and return 3-5 random transactions
  const shuffled = transactionTypes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
}

export function generateRandomUserName(): string {
  const firstNames = ['Alex', 'Priya', 'Rahul', 'Sneha', 'Arjun', 'Kavya', 'Vikram', 'Ananya', 'Rohan', 'Isha'];
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Jain', 'Verma', 'Yadav', 'Reddy'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}

export function generateRandomEmail(): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'protonmail.com'];
  const names = ['alex', 'priya', 'rahul', 'sneha', 'arjun', 'kavya', 'vikram', 'ananya', 'rohan', 'isha'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const numbers = Math.floor(Math.random() * 999);
  
  return `${name}${numbers}@${domain}`;
}
