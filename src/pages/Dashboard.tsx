import { motion } from "framer-motion";
import { Users, FolderOpen, DollarSign, TrendingUp, Calendar, FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

const statsData = [
  {
    title: "Total Clients",
    value: "24",
    change: "+12%",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+5%",
    icon: FolderOpen,
    color: "text-secondary",
  },
  {
    title: "Revenue (30d)",
    value: "$12,450",
    change: "+18%",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-accent",
  },
];

const recentProjects = [
  { name: "Website Redesign", client: "TechCorp", progress: 75, status: "In Progress" },
  { name: "Mobile App", client: "StartupXYZ", progress: 45, status: "In Progress" },
  { name: "Brand Identity", client: "LocalBiz", progress: 90, status: "Review" },
  { name: "E-commerce Site", client: "RetailCo", progress: 30, status: "Planning" },
];

const upcomingTasks = [
  { task: "Client meeting with TechCorp", time: "2:00 PM", priority: "high" },
  { task: "Design review for StartupXYZ", time: "4:30 PM", priority: "medium" },
  { task: "Submit proposal to NewClient", time: "Tomorrow", priority: "high" },
  { task: "Team standup meeting", time: "9:00 AM", priority: "low" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold gradient-text mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GlassCard variant="strong" className="p-6 hover:glow-primary transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <p className="text-sm text-success mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-primary/20 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard variant="strong" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">Recent Projects</h3>
                <Button variant="outline" size="sm" className="glass border-glass-border">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-glass/30 border border-glass-border"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                      <div className="mt-2">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {project.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{project.progress}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard variant="strong" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">Upcoming Tasks</h3>
                <Button variant="outline" size="sm" className="glass border-glass-border">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <motion.div
                    key={task.task}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-glass/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-destructive' :
                      task.priority === 'medium' ? 'bg-warning' : 'bg-success'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground">{task.task}</p>
                      <p className="text-sm text-muted-foreground">{task.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard variant="strong" className="p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-gradient-primary hover:opacity-90 h-12">
                Add Client
              </Button>
              <Button variant="outline" className="glass border-glass-border h-12">
                New Project
              </Button>
              <Button variant="outline" className="glass border-glass-border h-12">
                Create Invoice
              </Button>
              <Button variant="outline" className="glass border-glass-border h-12">
                Schedule Meeting
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}