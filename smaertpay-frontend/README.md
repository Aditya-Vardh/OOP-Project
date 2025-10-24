# SmartPay - Digital Wallet System

A modern, full-stack fintech web application built with Next.js, React, and Tailwind CSS. SmartPay provides a secure digital wallet where users can manage money, send payments, and track transactions with a stunning UI.

## 🎯 Features

### User Features
- **Secure Authentication**: JWT-based login/signup with email and password
- **Digital Wallet**: View and manage your wallet balance in real-time
- **Send Money**: Transfer funds to other users instantly
- **Add Funds**: Top up your wallet using various payment methods
- **Transaction History**: Track all transactions with search and filtering
- **User Profile**: Manage personal information and account settings
- **Analytics Dashboard**: View spending insights with interactive charts
- **Dark Mode**: Toggle between light and dark themes

### Admin Features
- **Admin Dashboard**: Monitor platform activity and statistics
- **User Management**: View and manage all registered users
- **Transaction Monitoring**: Track all platform transactions
- **System Analytics**: View key metrics and trends

### Design & UX
- **Modern UI**: Glassmorphism design with neon blue theme
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Toast Notifications**: Real-time feedback for user actions
- **Gradient Elements**: Beautiful gradient buttons and cards

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Authentication**: JWT with localStorage
- **Icons**: Lucide React
- **Notifications**: Sonner Toast

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/yarn

### Setup

1. **Clone or download the project**
   \`\`\`bash
   # If using GitHub
   git clone <repository-url>
   cd smartpay-wallet
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`
   JWT_SECRET=your-secret-key-here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🚀 Usage

### Getting Started

1. **Create an Account**
   - Click "Sign Up" on the landing page
   - Enter your name, email, and password
   - You'll be redirected to the dashboard

2. **Explore the Dashboard**
   - View your wallet balance
   - Access quick actions (Send Money, Add Funds, etc.)
   - Check recent transactions

3. **Add Funds**
   - Click "Add Funds" in the dashboard
   - Select a payment method
   - Enter the amount and confirm

4. **Send Money**
   - Click "Send Money" in the dashboard
   - Enter recipient email and amount
   - Review and confirm the transfer

5. **View Analytics**
   - Click "Analytics" to see spending insights
   - View charts for income, expenses, and trends

### Admin Access

To access the admin panel:
1. Navigate to `/admin`
2. View platform statistics and user management
3. Monitor all transactions

## 📁 Project Structure

\`\`\`
smartpay-wallet/
├── app/
│   ├── api/                    # API routes
│   │   └── auth/              # Authentication endpoints
│   │   └── transactions/      # Transaction endpoints
│   ├── admin/                 # Admin panel pages
│   ├── dashboard/             # User dashboard pages
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── auth-form.tsx          # Authentication form
│   ├── balance-card.tsx       # Wallet balance display
│   ├── dashboard-nav.tsx      # Dashboard navigation
│   ├── transaction-item.tsx   # Transaction display
│   └── theme-toggle.tsx       # Dark mode toggle
├── lib/
│   ├── auth.ts                # Authentication utilities
│   └── theme-provider.tsx     # Theme context
├── hooks/
│   └── use-toast.ts           # Toast notification hook
└── public/                    # Static assets
\`\`\`

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Validation**: Minimum 6 characters required
- **Protected Routes**: Dashboard and admin pages require authentication
- **Encrypted Data**: All sensitive data is encrypted
- **CORS Protection**: API endpoints are protected

## 🎨 Customization

### Change Theme Colors

Edit `app/globals.css` to modify the color scheme:
\`\`\`css
:root {
  --primary: oklch(0.45 0.3 260);      /* Primary color */
  --accent: oklch(0.6 0.25 260);       /* Accent color */
  --background: oklch(0.98 0.01 240);  /* Background */
}
\`\`\`

### Modify Animations

Adjust animation speeds in component files by changing Framer Motion `transition` props:
\`\`\`tsx
transition={{ duration: 0.5 }}  // Change duration value
\`\`\`

## 📊 Mock Data

The application uses mock data for demonstration. To integrate with a real database:

1. **Replace mock users array** in `app/api/auth/signup/route.ts`
2. **Connect to MongoDB** using Mongoose
3. **Update API routes** to use database queries
4. **Implement real payment processing** for Add Funds

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy with one click

\`\`\`bash
# Or use Vercel CLI
vercel deploy
\`\`\`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Transactions
- `POST /api/transactions/add` - Add funds to wallet
- `POST /api/transactions/send` - Send money to user
- `GET /api/transactions/history` - Get transaction history

## 🐛 Troubleshooting

### Issue: "Unauthorized" error
- Check if token is stored in localStorage
- Try logging out and logging back in
- Clear browser cache and cookies

### Issue: Animations not working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for errors

### Issue: Dark mode not persisting
- Clear localStorage and refresh
- Check if theme provider is properly initialized

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact support.

---

**Built with ❤️ using Next.js and Tailwind CSS**
