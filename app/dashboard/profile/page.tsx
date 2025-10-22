"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { getUser, logout } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, MapPin, LogOut } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  name: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const userData = getUser()
    if (userData) {
      setUser(userData)
      setName(userData.name || "")
    }
  }, [])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      // In production, this would call an API endpoint
      const updatedUser = { ...user, name }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="w-full h-40 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-16 h-16 text-primary-foreground" />
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Change Picture
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input value={user?.email || ""} disabled className="bg-muted" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 " />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" />
              </div>
              <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your security and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="bg-transparent">
                Enable Two-Factor Authentication
              </Button>
              <Button variant="outline" className="bg-transparent">
                Connected Devices
              </Button>
              <Button variant="outline" className="bg-transparent">
                Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button onClick={handleLogout} variant="destructive" className="w-full gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </motion.div>
    </div>
  )
}
