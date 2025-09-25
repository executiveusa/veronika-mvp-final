import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/ui/glass-card";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
];

export default function BookDemo() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a time slot.",
        variant: "destructive"
      });
      return;
    }

    // Mock booking submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Demo Booked Successfully!",
        description: "We'll send you a confirmation email shortly.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <GlassCard variant="strong" className="p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Demo Booked!</h2>
            <p className="text-muted-foreground mb-6">
              Your demo has been scheduled for {selectedDate} at {selectedTime}. 
              We'll send you a confirmation email with the meeting details.
            </p>
            <Link to="/">
              <Button className="bg-gradient-primary hover:opacity-90">
                Back to Home
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-4">Book Your Demo</h1>
          <p className="text-xl text-muted-foreground">
            Schedule a personalized demo to see how Veronika can transform your business workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <GlassCard variant="strong" className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">What to Expect</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium text-card-foreground">30-Minute Session</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive walkthrough of all features</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Personalized Demo</h4>
                    <p className="text-sm text-muted-foreground">Tailored to your business needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-secondary mt-1" />
                  <div>
                    <h4 className="font-medium text-card-foreground">Q&A Session</h4>
                    <p className="text-sm text-muted-foreground">Get all your questions answered</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="strong" className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Demo Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-card-foreground">Client & Project Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-card-foreground">Task Tracking & Kanban Boards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-card-foreground">Invoice & Payment Processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-card-foreground">Analytics & Reporting</span>
                </li>
              </ul>
            </GlassCard>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard variant="strong" className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6">Schedule Your Demo</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="glass border-glass-border"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass border-glass-border"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="glass border-glass-border"
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="glass border-glass-border"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <Label>Preferred Time *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className={selectedTime === time ? "bg-gradient-primary" : "glass border-glass-border"}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="glass border-glass-border"
                    placeholder="Tell us about your business needs..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                  Book My Demo
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}