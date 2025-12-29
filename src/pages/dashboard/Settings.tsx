import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, Palette, Globe, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useAuth } from "@/contexts/auth-context";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language", icon: Globe },
];

export default function Settings() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            className="text-3xl font-bold mb-2"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Settings
          </h1>
          <p style={{ color: 'rgba(226, 232, 240, 0.6)' }}>Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveSection(section.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left"
                    style={{
                      background: activeSection === section.id 
                        ? 'rgba(45, 106, 79, 0.2)' 
                        : 'transparent',
                      border: activeSection === section.id 
                        ? '1px solid rgba(45, 106, 79, 0.3)' 
                        : '1px solid transparent',
                      color: activeSection === section.id ? '#4ADE80' : 'rgba(226, 232, 240, 0.8)'
                    }}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-medium">{section.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div 
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' }}
                      >
                        {user?.email?.[0]?.toUpperCase() || 'V'}
                      </div>
                      <button 
                        className="absolute -bottom-2 -right-2 p-2 rounded-xl"
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <Camera className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{user?.email?.split('@')[0] || 'Veronika'}</h3>
                      <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{user?.email || 'admin@veronika.app'}</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white/80">Full Name</Label>
                      <Input 
                        defaultValue={user?.email?.split('@')[0] || 'Veronika'}
                        className="h-12 rounded-xl border-0 text-white bg-white/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">Email</Label>
                      <Input 
                        type="email"
                        defaultValue={user?.email || 'admin@veronika.app'}
                        className="h-12 rounded-xl border-0 text-white bg-white/5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">Phone</Label>
                      <Input 
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="h-12 rounded-xl border-0 text-white bg-white/5 placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">Company</Label>
                      <Input 
                        placeholder="Your company name"
                        className="h-12 rounded-xl border-0 text-white bg-white/5 placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="rounded-xl font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                        color: 'white'
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </motion.div>
                </div>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: "email", label: "Email Notifications", description: "Receive updates via email" },
                      { key: "push", label: "Push Notifications", description: "Receive push notifications in browser" },
                      { key: "weekly", label: "Weekly Summary", description: "Get a weekly digest of your activity" },
                      { key: "marketing", label: "Marketing Emails", description: "Receive tips and product updates" },
                    ].map((item) => (
                      <div 
                        key={item.key}
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                      >
                        <div>
                          <h3 className="font-medium text-white">{item.label}</h3>
                          <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{item.description}</p>
                        </div>
                        <Switch 
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white/80">Current Password</Label>
                      <Input 
                        type="password"
                        placeholder="Enter current password"
                        className="h-12 rounded-xl border-0 text-white bg-white/5 placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">New Password</Label>
                      <Input 
                        type="password"
                        placeholder="Enter new password"
                        className="h-12 rounded-xl border-0 text-white bg-white/5 placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80">Confirm New Password</Label>
                      <Input 
                        type="password"
                        placeholder="Confirm new password"
                        className="h-12 rounded-xl border-0 text-white bg-white/5 placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className="rounded-xl font-semibold"
                      style={{
                        background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                        color: 'white'
                      }}
                    >
                      Update Password
                    </Button>
                  </motion.div>
                </div>
              )}

              {(activeSection === "billing" || activeSection === "appearance" || activeSection === "language") && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      {activeSection === "billing" && <CreditCard className="h-8 w-8" style={{ color: 'rgba(226, 232, 240, 0.4)' }} />}
                      {activeSection === "appearance" && <Palette className="h-8 w-8" style={{ color: 'rgba(226, 232, 240, 0.4)' }} />}
                      {activeSection === "language" && <Globe className="h-8 w-8" style={{ color: 'rgba(226, 232, 240, 0.4)' }} />}
                    </div>
                    <h3 className="font-medium text-white mb-2">Coming Soon</h3>
                    <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
                      This section is under development
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
