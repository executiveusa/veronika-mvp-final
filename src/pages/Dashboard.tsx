import { motion } from "framer-motion";
import React from "react";
import { Users, FolderOpen, DollarSign, TrendingUp, Calendar, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { RubeAssistant } from "@/components/dashboard/rube-assistant";
import { useTranslation } from 'react-i18next';

const statsData = [
  {
    titleKey: "totalClients",
    value: "24",
    change: "+12%",
    icon: Users,
    color: "#818CF8",
    bgColor: "rgba(129, 140, 248, 0.15)",
  },
  {
    titleKey: "activeProjects",
    value: "8",
    change: "+5%",
    icon: FolderOpen,
    color: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.15)",
  },
  {
    titleKey: "monthlyRevenue",
    value: "$12,450",
    change: "+18%",
    icon: DollarSign,
    color: "#4ADE80",
    bgColor: "rgba(74, 222, 128, 0.15)",
  },
  {
    titleKey: "upcomingSessions",
    value: "6",
    change: "+2",
    icon: TrendingUp,
    color: "#FBBF24",
    bgColor: "rgba(251, 191, 36, 0.15)",
  },
];

const recentProjects = [
  { name: "Business Analysis", client: "TechCorp", progress: 75, status: "In Progress" },
  { name: "Pitch Deck", client: "StartupXYZ", progress: 45, status: "In Progress" },
  { name: "Financial Review", client: "LocalBiz", progress: 90, status: "Review" },
  { name: "Strategy Session", client: "RetailCo", progress: 30, status: "Planning" },
];

const upcomingTasks = [
  { task: "Client meeting with TechCorp", time: "2:00 PM", priority: "high" },
  { task: "Design review for StartupXYZ", time: "4:30 PM", priority: "medium" },
  { task: "Submit proposal to NewClient", time: "Tomorrow", priority: "high" },
  { task: "Team standup meeting", time: "9:00 AM", priority: "low" },
];

export default function Dashboard() {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Tabs */}
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
              {t('overview')}
            </h1>
            <p style={{ color: 'rgba(226, 232, 240, 0.6)' }}>{t('welcomeBack')}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList 
            className="grid w-full grid-cols-2 sm:w-auto border-0"
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px'
            }}
          >
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg"
              style={{ color: 'rgba(226, 232, 240, 0.7)' }}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="rube" 
              className="flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-lg"
              style={{ color: 'rgba(226, 232, 240, 0.7)' }}
            >
              <Zap className="h-4 w-4" />
              Rube AI
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8 mt-8">

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
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div 
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm mb-1" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>{t(stat.titleKey)}</p>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-sm mt-1" style={{ color: '#4ADE80' }}>{stat.change} from last month</p>
                  </div>
                  <div 
                    className="p-3 rounded-xl"
                    style={{ background: stat.bgColor }}
                  >
                    <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
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
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{t('recentProjects')}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-0"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(226, 232, 240, 0.8)'
                  }}
                >
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
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{project.client}</p>
                      <div className="mt-2">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          background: 'rgba(74, 222, 128, 0.15)',
                          color: '#4ADE80'
                        }}
                      >
                        {project.status}
                      </span>
                      <p className="text-sm mt-1" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{project.progress}%</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{t('upcomingTasks')}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-0"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'rgba(226, 232, 240, 0.8)'
                  }}
                >
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
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3 rounded-xl transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: task.priority === 'high' ? '#EF4444' :
                          task.priority === 'medium' ? '#FBBF24' : '#4ADE80'
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-white">{task.task}</p>
                      <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{task.time}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      style={{ color: 'rgba(226, 232, 240, 0.6)' }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div 
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="w-full h-12 rounded-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                    color: 'white'
                  }}
                >
                  {t('add')} Client
                </Button>
              </motion.div>
              {['New Project', 'Create Invoice', 'Schedule Meeting'].map((action) => (
                <motion.div key={action} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 rounded-xl border-0"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(226, 232, 240, 0.8)'
                    }}
                  >
                    {action}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
          </TabsContent>

          {/* Rube AI Tab */}
          <TabsContent value="rube" className="mt-8">
            <RubeAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
