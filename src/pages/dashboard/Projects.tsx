import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Calendar, Users, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/ui/glass-card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjects } from "@/hooks/use-projects";
import { Database } from "@/integrations/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
type ProjectWithClient = ProjectRow & { clients: { name: string } | null };

const statusColors: Record<string, string> = {
  planning: "bg-muted/20 text-muted-foreground",
  "in-progress": "bg-primary/20 text-primary",
  review: "bg-warning/20 text-warning",
  completed: "bg-success/20 text-success"
};

function ProjectCard({ project }: { project: ProjectWithClient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard variant="strong" className="p-4 cursor-pointer hover:glow-primary transition-all duration-300">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-card-foreground">{project.name}</h4>
            <Badge className={statusColors[project.status]}>
              {project.status.replace("-", " ")}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description || "No description"}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{project.clients?.name || "No client"}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-card-foreground font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline"}</span>
            </div>
            <div className="flex items-center gap-1 text-success">
              <DollarSign className="h-3 w-3" />
              <span>${Number(project.spent || 0).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex -space-x-2">
            {(project.team || []).slice(0, 3).map((member, index) => (
              <div
                key={member}
                className="w-6 h-6 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center"
                style={{ zIndex: 3 - index }}
              >
                <span className="text-xs text-white font-medium">
                  {member[0]}
                </span>
              </div>
            ))}
            {(project.team?.length || 0) > 3 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                +{(project.team?.length || 0) - 3}
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const { data: projects = [], isLoading } = useProjects();

  const statusColumns = useMemo(() => ({
    planning: projects.filter(p => p.status === "planning"),
    "in-progress": projects.filter(p => p.status === "in-progress"),
    review: projects.filter(p => p.status === "review"),
    completed: projects.filter(p => p.status === "completed")
  }), [projects]);

  const totalBudget = projects.reduce((sum, p) => sum + Number(p.budget || 0), 0);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
              <h1 className="text-3xl font-bold gradient-text">Projects</h1>
              <p className="text-muted-foreground">Track and manage your project portfolio</p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {projects.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">
                  {statusColumns["in-progress"].length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-warning/20">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">
                  {statusColumns.completed.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/20">
                <Calendar className="h-6 w-6 text-success" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-primary">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Filters */}
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
                  placeholder="Search projects..."
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
                <Tabs value={view} onValueChange={(v) => setView(v as "kanban" | "list")}>
                  <TabsList className="glass">
                    <TabsTrigger value="kanban">Kanban</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Projects Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs value={view} className="space-y-6">
            <TabsContent value="kanban" className="space-y-0">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {Object.entries(statusColumns).map(([status, projectList]) => (
                    <div key={status} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-card-foreground capitalize">
                          {status.replace("-", " ")}
                        </h3>
                        <Badge variant="outline" className="glass border-glass-border">
                          {projectList.length}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {projectList
                          .filter(project =>
                            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (project.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
                          )
                          .map((project) => (
                            <ProjectCard key={project.id} project={project} />
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <GlassCard variant="strong" className="p-12 text-center">
                  <p className="text-muted-foreground">No projects yet. Create your first project!</p>
                </GlassCard>
              )}
            </TabsContent>
            
            <TabsContent value="list">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects
                    .filter(project =>
                      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      (project.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
                    )
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              ) : (
                <GlassCard variant="strong" className="p-12 text-center">
                  <p className="text-muted-foreground">No projects yet. Create your first project!</p>
                </GlassCard>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}