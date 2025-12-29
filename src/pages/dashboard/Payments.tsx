import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

interface Payment {
  id: string;
  client: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  method: string;
  date: string;
  invoiceId: string;
}

const mockPayments: Payment[] = [
  { id: "1", client: "TechCorp", amount: 5000, status: "completed", method: "Credit Card", date: "2024-12-28", invoiceId: "INV-001" },
  { id: "2", client: "StartupXYZ", amount: 3500, status: "completed", method: "Bank Transfer", date: "2024-12-25", invoiceId: "INV-002" },
  { id: "3", client: "LocalBiz", amount: 2000, status: "pending", method: "PayPal", date: "2024-12-20", invoiceId: "INV-003" },
  { id: "4", client: "RetailCo", amount: 4500, status: "completed", method: "Credit Card", date: "2024-12-18", invoiceId: "INV-004" },
  { id: "5", client: "DesignStudio", amount: 1500, status: "failed", method: "Bank Transfer", date: "2024-12-15", invoiceId: "INV-005" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  completed: { bg: "rgba(74, 222, 128, 0.15)", text: "#4ADE80" },
  pending: { bg: "rgba(251, 191, 36, 0.15)", text: "#FBBF24" },
  failed: { bg: "rgba(239, 68, 68, 0.15)", text: "#EF4444" }
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = mockPayments.filter(payment =>
    payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = mockPayments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayments.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Payments
            </h1>
            <p style={{ color: 'rgba(226, 232, 240, 0.6)' }}>Track and manage all payment transactions</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="rounded-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                color: 'white'
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "#4ADE80" },
            { label: "Pending", value: `$${pendingAmount.toLocaleString()}`, icon: Clock, color: "#FBBF24" },
            { label: "This Month", value: "$12,500", icon: TrendingUp, color: "#818CF8" },
            { label: "Transactions", value: mockPayments.length.toString(), icon: CreditCard, color: "#38BDF8" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>{stat.label}</p>
                  <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                </div>
                <div 
                  className="p-3 rounded-xl"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(226, 232, 240, 0.4)' }} />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-0 text-white placeholder:text-white/30"
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              />
            </div>
            <Button 
              variant="outline" 
              className="rounded-xl border-0"
              style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(226, 232, 240, 0.8)' }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Payments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="space-y-4">
            {filteredPayments.map((payment, index) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' }}
                  >
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{payment.client}</p>
                    <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
                      {payment.invoiceId} • {payment.method}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">${payment.amount.toLocaleString()}</p>
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ 
                      background: statusColors[payment.status].bg,
                      color: statusColors[payment.status].text
                    }}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
