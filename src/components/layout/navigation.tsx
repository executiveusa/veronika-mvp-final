import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

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

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass border-glass-border"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
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
        <GlassCard variant="strong" className="h-full p-6 rounded-none lg:rounded-xl m-0 lg:m-4">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">Veronika</h2>
                <p className="text-xs text-muted-foreground">Business MVP</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative",
                      isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "hover:bg-glass/50 text-card-foreground hover:text-primary"
                    )}
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
                  </Link>
                );
              })}
            </nav>

            {/* User Profile */}
            <div className="pt-6 border-t border-glass-border">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-glass/50 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">Demo User</p>
                  <p className="text-xs text-muted-foreground">demo@veronika.app</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.aside>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}