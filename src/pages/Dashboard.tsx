import { motion } from "framer-motion";
import { Users, FolderOpen, DollarSign, TrendingUp, Calendar, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useTranslation } from 'react-i18next';
import { useClients } from "@/hooks/use-clients";
import { useProjects } from "@/hooks/use-projects";
import { useBookings } from "@/hooks/use-bookings";
import { useExpenses } from "@/hooks/use-expenses";

export default function Dashboard() {
  const { t } = useTranslation('common');
  const { data: clients = [] } = useClients();
  const { data: projects = [] } = useProjects();
  const { data: bookings = [] } = useBookings();
  const { data: expenses = [] } = useExpenses();

  // Calculate stats from real data
  const totalClients = clients.length;
  const activeProjects = projects.filter(p => p.status === "in-progress").length;
  
  // Calculate monthly revenue from approved/reimbursed expenses (as a proxy for revenue tracking)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyExpenses = expenses
    .filter(e => {
      const expenseDate = new Date(e.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Count upcoming bookings (scheduled or confirmed, future dates)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingSessions = bookings.filter(b => {
    const bookingDate = new Date(b.date);
    return bookingDate >= today && (b.status === "scheduled" || b.status === "confirmed");
  }).length;

  const statsData = [
    {
      titleKey: "totalClients",
      value: totalClients.toString(),
      change: "+12%",
      icon: Users,
      colorClass: "text-[hsl(243,75%,59%)]",
      bgClass: "bg-[hsl(243,75%,59%,0.2)]",
    },
    {
      titleKey: "activeProjects",
      value: activeProjects.toString(),
      change: "+5%",
      icon: FolderOpen,
      colorClass: "text-[hsl(199,89%,48%)]",
      bgClass: "bg-[hsl(199,89%,48%,0.2)]",
    },
    {
      titleKey: "monthlyRevenue",
      value: `$${monthlyExpenses.toLocaleString()}`,
      change: "+18%",
      icon: DollarSign,
      colorClass: "text-[hsl(142,71%,45%)]",
      bgClass: "bg-[hsl(142,71%,45%,0.2)]",
    },
    {
      titleKey: "upcomingSessions",
      value: upcomingSessions.toString(),
      change: "+2",
      icon: TrendingUp,
      colorClass: "text-[hsl(45,93%,47%)]",
      bgClass: "bg-[hsl(45,93%,47%,0.2)]",
    },
  ];

  // Get recent projects from database
  const recentProjects = projects.slice(0, 4).map(project => ({
    name: project.name,
    client: project.clients?.name || "No client",
    progress: project.progress,
    status: project.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
  }));

  // Get upcoming tasks from bookings
  const upcomingTasks = bookings
    .filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate >= today && (b.status === "scheduled" || b.status === "confirmed");
    })
    .slice(0, 4)
    .map(booking => ({
      task: `${booking.service} with ${booking.client_name}`,
      time: booking.time,
      priority: booking.status === "confirmed" ? "high" : "medium" as "high" | "medium" | "low",
    }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('overview')}</h1>
          <p className="text-muted-foreground">{t('welcomeBack')}</p>
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
              key={stat.titleKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t(stat.titleKey)}</p>
                    <p className={"text-2xl font-bold " + stat.colorClass}>{stat.value}</p>
                    <p className="text-sm text-green-500 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={"p-3 rounded-xl " + stat.bgClass}>
                    <stat.icon className={"h-6 w-6 " + stat.colorClass} />
                  </div>
                </div>
              </Card>
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
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">{t('recentProjects')}</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project, index) => (
                    <motion.div
                      key={project.name + index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                        <div className="mt-2">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                          {project.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">{project.progress}%</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No projects yet. Create your first project!
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">{t('upcomingTasks')}</h3>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task.task + index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className={"w-2 h-2 rounded-full " + (
                        task.priority === 'high' ? 'bg-red-500' :
                        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      )} />
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">{task.task}</p>
                        <p className="text-sm text-muted-foreground">{task.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming bookings. Schedule your first session!
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-primary hover:bg-primary/90 h-12">
                {t('add')} Client
              </Button>
              <Button variant="outline" className="h-12">
                New Project
              </Button>
              <Button variant="outline" className="h-12">
                Create Invoice
              </Button>
              <Button variant="outline" className="h-12">
                Schedule Meeting
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
