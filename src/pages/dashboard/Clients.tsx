import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, MapPin } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { DataTable } from "@/components/ui/data-table";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "prospect";
  projects: number;
  revenue: number;
  location: string;
  joinDate: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp",
    status: "active",
    projects: 3,
    revenue: 15000,
    location: "New York, NY",
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@startupxyz.com",
    phone: "+1 (555) 987-6543",
    company: "StartupXYZ",
    status: "active",
    projects: 2,
    revenue: 8500,
    location: "San Francisco, CA",
    joinDate: "2024-02-20"
  },
  {
    id: "3",
    name: "Mike Davis",
    email: "mike@localbiz.com",
    phone: "+1 (555) 456-7890",
    company: "LocalBiz",
    status: "prospect",
    projects: 0,
    revenue: 0,
    location: "Chicago, IL",
    joinDate: "2024-03-10"
  },
];

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success",
  inactive: "bg-muted/20 text-muted-foreground",
  prospect: "bg-warning/20 text-warning"
};

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Client",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {client.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium text-card-foreground">{client.name}</div>
              <div className="text-sm text-muted-foreground">{client.company}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-card-foreground">{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{client.phone}</span>
            </div>
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
          <Badge className={statusColors[status] || statusColors.inactive}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => {
        const projects = row.getValue("projects") as number;
        return <span className="font-medium text-card-foreground">{projects}</span>;
      },
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const revenue = row.getValue("revenue") as number;
        return (
          <span className="font-medium text-success">
            ${revenue.toLocaleString()}
          </span>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.getValue("location") as string;
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-glass-border">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Client</DropdownMenuItem>
              <DropdownMenuItem>Create Project</DropdownMenuItem>
              <DropdownMenuItem>Send Invoice</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold gradient-text">Clients</h1>
              <p className="text-muted-foreground">Manage your client relationships and track engagement</p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
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
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <p className="text-2xl font-bold text-card-foreground">24</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Phone className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">18</p>
              </div>
              <div className="p-3 rounded-lg bg-success/20">
                <Phone className="h-6 w-6 text-success" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prospects</p>
                <p className="text-2xl font-bold text-warning">4</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/20">
                <Phone className="h-6 w-6 text-warning" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-primary">$47,200</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Phone className="h-6 w-6 text-primary" />
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
                  placeholder="Search clients..."
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
                  Export CSV
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Clients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DataTable columns={columns} data={filteredClients} />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}