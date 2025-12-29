import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  Receipt, 
  CreditCard, 
  FileText, 
  Calendar, 
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navigationItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: FolderOpen },
  { name: "Expenses", href: "/dashboard/expenses", icon: Receipt },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Notes", href: "/dashboard/notes", icon: FileText },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="border-0"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              backdropFilter: 'blur(10px)'
            }}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </motion.div>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-full w-64 z-40 lg:relative lg:z-0",
          "lg:translate-x-0"
        )}
      >
        <div 
          className="h-full p-6 rounded-none lg:rounded-2xl m-0 lg:m-4"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="flex flex-col h-full">
            {/* Logo + Theme Toggle */}
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold text-lg">V</span>
                </motion.div>
                <div>
                  <h2 
                    className="text-xl font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Veronika
                  </h2>
                  <p className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>Business MVP</p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative"
                      )}
                      style={{
                        background: isActive 
                          ? 'rgba(45, 106, 79, 0.2)' 
                          : 'transparent',
                        border: isActive 
                          ? '1px solid rgba(45, 106, 79, 0.3)' 
                          : '1px solid transparent',
                        color: isActive ? '#4ADE80' : 'rgba(226, 232, 240, 0.8)'
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-3"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* User Profile + Logout */}
            <div 
              className="pt-6 mt-6 space-y-3"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' }}
                >
                  {user?.email?.[0]?.toUpperCase() || 'V'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email?.split('@')[0] || 'Veronika'}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
                    {user?.email || 'Admin'}
                  </p>
                </div>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#F87171'
                }}
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}