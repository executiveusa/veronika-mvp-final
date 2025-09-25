import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Clock, User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  source: "website" | "referral" | "direct" | "social";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    clientName: "Alice Johnson",
    clientEmail: "alice@example.com",
    clientPhone: "+1 (555) 123-4567",
    service: "Web Design Consultation",
    date: "2024-03-20",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    notes: "Interested in e-commerce website",
    source: "website"
  },
  {
    id: "2",
    clientName: "Bob Smith",
    clientEmail: "bob@company.com",
    clientPhone: "+1 (555) 987-6543",
    service: "Brand Strategy Session",
    date: "2024-03-21",
    time: "14:00",
    duration: 90,
    status: "scheduled",
    notes: "New startup looking for complete rebrand",
    source: "referral"
  },
  {
    id: "3",
    clientName: "Carol Davis",
    clientEmail: "carol@business.com",
    clientPhone: "+1 (555) 456-7890",
    service: "Project Discovery Call",
    date: "2024-03-19",
    time: "11:00",
    duration: 45,
    status: "completed",
    notes: "Mobile app development project",
    source: "direct"
  },
  {
    id: "4",
    clientName: "David Wilson",
    clientEmail: "david@startup.io",
    clientPhone: "+1 (555) 321-0987",
    service: "Technical Consultation",
    date: "2024-03-22",
    time: "15:30",
    duration: 60,
    status: "scheduled",
    notes: "Architecture review needed",
    source: "social"
  }
];

const statusColors: Record<string, string> = {
  scheduled: "bg-muted/20 text-muted-foreground",
  confirmed: "bg-primary/20 text-primary",
  completed: "bg-success/20 text-success",
  cancelled: "bg-destructive/20 text-destructive"
};

const sourceColors: Record<string, string> = {
  website: "bg-primary/20 text-primary",
  referral: "bg-success/20 text-success",
  direct: "bg-secondary/20 text-secondary",
  social: "bg-accent/20 text-accent"
};

function BookingCard({ booking }: { booking: Booking }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard variant="strong" className="p-6 hover:glow-primary transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-card-foreground text-lg">{booking.clientName}</h4>
              <p className="text-primary font-medium">{booking.service}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={statusColors[booking.status]}>
                {booking.status}
              </Badge>
              <Badge className={sourceColors[booking.source]}>
                {booking.source}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(booking.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{booking.time} ({booking.duration}min)</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{booking.clientEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{booking.clientPhone}</span>
            </div>
          </div>

          {booking.notes && (
            <div className="p-3 rounded-lg bg-glass/30 border border-glass-border">
              <p className="text-sm text-card-foreground">{booking.notes}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="glass border-glass-border">
              Edit
            </Button>
            <Button size="sm" variant="outline" className="glass border-glass-border">
              Reschedule
            </Button>
            {booking.status === "scheduled" && (
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                Confirm
              </Button>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Bookings() {
  const [view, setView] = useState<"upcoming" | "past" | "all">("upcoming");

  const today = new Date();
  const upcomingBookings = mockBookings.filter(b => 
    new Date(b.date) >= today && (b.status === "scheduled" || b.status === "confirmed")
  );
  const pastBookings = mockBookings.filter(b => 
    new Date(b.date) < today || b.status === "completed"
  );

  const getBookingsForView = () => {
    switch (view) {
      case "upcoming":
        return upcomingBookings;
      case "past":
        return pastBookings;
      default:
        return mockBookings;
    }
  };

  const totalBookings = mockBookings.length;
  const confirmedBookings = mockBookings.filter(b => b.status === "confirmed").length;
  const completedBookings = mockBookings.filter(b => b.status === "completed").length;

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
              <h1 className="text-3xl font-bold gradient-text">Bookings</h1>
              <p className="text-muted-foreground">Manage your appointments and consultations</p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
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
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-card-foreground">{totalBookings}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-warning">{upcomingBookings.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/20">
                <Clock className="h-6 w-6 text-warning" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-primary">{confirmedBookings}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard variant="strong" className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedBookings}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/20">
                <User className="h-6 w-6 text-success" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bookings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard variant="strong" className="p-6">
            <Tabs value={view} onValueChange={(v) => setView(v as "upcoming" | "past" | "all")}>
              <div className="flex items-center justify-between mb-6">
                <TabsList className="glass">
                  <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                  <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
                  <TabsTrigger value="all">All ({totalBookings})</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="glass border-glass-border">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar View
                  </Button>
                </div>
              </div>

              <TabsContent value={view} className="space-y-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {getBookingsForView().map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
                
                {getBookingsForView().length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      No bookings found
                    </h3>
                    <p className="text-muted-foreground">
                      {view === "upcoming" 
                        ? "You don't have any upcoming bookings."
                        : view === "past"
                        ? "No past bookings to display."
                        : "No bookings available."
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}