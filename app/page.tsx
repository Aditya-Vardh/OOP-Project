"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Wallet, Send, History, Shield } from "lucide-react"

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: Wallet,
      title: "Secure Wallet",
      description: "Manage your digital funds with bank-level security",
    },
    {
      icon: Send,
      title: "Instant Transfers",
      description: "Send money to other users instantly and securely",
    },
    {
      icon: History,
      title: "Transaction History",
      description: "Track all your transactions with detailed records",
    },
    {
      icon: Shield,
      title: "Protected",
      description: "JWT authentication and encrypted data storage",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">SmartPay</span>
          </motion.div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Your Digital Wallet,
            <span className="gradient-text"> Reimagined</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Secure, fast, and intuitive. Manage your money with SmartPay's modern digital wallet system.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Animated Wallet Card Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-80 md:h-96 mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
          <div className="relative glass dark:glass-dark rounded-3xl p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
                <motion.h2
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-4xl font-bold gradient-text"
                >
                  ₹12,450.50
                </motion.h2>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Card Number</p>
                <p className="text-lg font-mono">5672 1463 4752 4829</p>
              </div>
              <p className="text-sm text-muted-foreground">Valid Thru 12/26</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need for secure digital payments</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass dark:glass-dark rounded-2xl p-6 hover:border-primary/50 transition-smooth hover:shadow-lg"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass dark:glass-dark rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of users managing their finances securely</p>
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Create Your Wallet <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-muted-foreground">
          <p>&copy; 2025 SmartPay. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
