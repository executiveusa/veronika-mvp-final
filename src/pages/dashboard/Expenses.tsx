import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Download, Receipt, Calendar } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable } from "@/components/ui/data-table";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  client?: string;
  project?: string;
  status: "pending" | "approved" | "reimbursed";
  receipt: boolean;
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Office supplies and equipment",
    amount: 450.00,
    category: "Office",
    date: "2024-03-15",
    status: "approved",
    receipt: true
  },
  {
    id: "2",
    description: "Client meeting lunch",
    amount: 85.50,
    category: "Meals",
    date: "2024-03-14",
    client: "TechCorp",
    project: "Website Redesign",
    status: "reimbursed",
    receipt: true
  },
  {
    id: "3",
    description: "Software license renewal",
    amount: 299.99,
    category: "Software",
    date: "2024-03-12",
    status: "pending",
    receipt: false
  },
  {
    id: "4",
    description: "Travel expenses for client meeting",
    amount: 180.00,
    category: "Travel",
    date: "2024-03-10",
    client: "StartupXYZ",
    project: "Mobile App",
    status: "approved",
    receipt: true
  }
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  approved: "bg-primary/20 text-primary",
  reimbursed: "bg-success/20 text-success"
};

const categoryColors: Record<string, string> = {
  Office: "bg-muted/20 text-muted-foreground",
  Meals: "bg-secondary/20 text-secondary",
  Software: "bg-accent/20 text-accent",
  Travel: "bg-primary/20 text-primary"
};

export default function Expenses() {
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const expense = row.original;
        return (
          <div>
            <div className="font-medium text-card-foreground">{expense.description}</div>
            {expense.client && (
              <div className="text-sm text-muted-foreground">
                {expense.client} {expense.project && `• ${expense.project}`}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return (
          <span className="font-semibold text-card-foreground">
            ${amount.toFixed(2)}
          </span>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <Badge className={categoryColors[category] || categoryColors.Office}>
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(date).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "receipt",
      header: "Receipt",
      cell: ({ row }) => {
        const hasReceipt = row.getValue("receipt") as boolean;
        return (
          <div className="flex items-center gap-2">
            <Receipt className={`h-4 w-4 ${hasReceipt ? 'text-success' : 'text-muted-foreground'}`} />
            <span className="text-sm text-muted-foreground">
              {hasReceipt ? 'Yes' : 'No'}
            </span>
          </div>
        );
      },
    },
  ];

  const filteredExpenses = mockExpenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.project?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = mockExpenses.filter(e => e.status === "pending").reduce((sum, expense) => sum + expense.amount, 0);
  const reimbursedExpenses = mockExpenses.filter(e => e.status === "reimbursed").reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Expenses</h1>
              <p className="text-muted-foreground">Track and manage your business expenses</p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-card-foreground">
                  ${totalExpenses.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">
                  ${pendingExpenses.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-warning/20">
                <Receipt className="h-6 w-6 text-warning" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reimbursed</p>
                <p className="text-2xl font-bold text-success">
                  ${reimbursedExpenses.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/20">
                <Receipt className="h-6 w-6 text-success" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">
                  ${mockExpenses.filter(e => 
                    new Date(e.date).getMonth() === new Date().getMonth()
                  ).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-glass-border"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="glass border-glass-border">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="glass border-glass-border">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Expenses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DataTable columns={columns} data={filteredExpenses} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}