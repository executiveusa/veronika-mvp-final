import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, ArrowLeft, Sparkles, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      <div 
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div 
            className="p-8 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <motion.div 
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 30px rgba(74, 222, 128, 0.3)',
                  '0 0 60px rgba(74, 222, 128, 0.5)',
                  '0 0 30px rgba(74, 222, 128, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' }}
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Demo Booked!</h2>
            <p className="mb-6" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
              Your demo has been scheduled for {selectedDate} at {selectedTime}. 
              We'll send you a confirmation email with the meeting details.
            </p>
            <Link to="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  className="px-8 py-3 rounded-xl font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                    color: 'white'
                  }}
                >
                  Back to Home
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
    >
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(45, 106, 79, 0.5) 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)' }} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link 
            to="/" 
            className="inline-flex items-center mb-8 transition-colors group"
            style={{ color: 'rgba(226, 232, 240, 0.7)' }}
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ 
                background: 'rgba(45, 106, 79, 0.2)',
                border: '1px solid rgba(45, 106, 79, 0.3)',
                color: '#4ADE80'
              }}
            >
              <Calendar className="h-4 w-4" />
              Free Consultation
            </motion.span>
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(226, 232, 240, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Book Your Consultation
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
            Schedule a personalized session to discover how strategic guidance can transform your business.
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
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6">What to Expect</h3>
              <div className="space-y-5">
                {[
                  { icon: Clock, title: "30-Minute Session", desc: "Comprehensive discussion of your needs", color: "#4ADE80" },
                  { icon: Star, title: "Personalized Approach", desc: "Tailored to your specific business challenges", color: "#FBBF24" },
                  { icon: Shield, title: "Confidential & Free", desc: "No obligation, complete privacy", color: "#818CF8" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: `${item.color}20`,
                        border: `1px solid ${item.color}40`
                      }}
                    >
                      <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6">Discussion Topics</h3>
              <ul className="space-y-3">
                {[
                  "Business Strategy & Planning",
                  "Process Optimization",
                  "Growth Opportunities",
                  "Resource Management"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <span style={{ color: 'rgba(226, 232, 240, 0.9)' }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-emerald-400" />
                <h3 className="text-xl font-display font-semibold text-white">Schedule Your Session</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 rounded-xl border-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 rounded-xl border-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white'
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1.5 rounded-xl border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white'
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1.5 rounded-xl border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      colorScheme: 'dark'
                    }}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                    Preferred Time *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all"
                        style={{
                          background: selectedTime === time 
                            ? 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' 
                            : 'rgba(255, 255, 255, 0.05)',
                          border: selectedTime === time 
                            ? '1px solid rgba(74, 222, 128, 0.3)' 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          color: selectedTime === time ? 'white' : 'rgba(226, 232, 240, 0.8)'
                        }}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                    How Can I Help You?
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 rounded-xl border-0 min-h-[100px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'white'
                    }}
                    placeholder="Tell us about your business challenges..."
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit" 
                    className="w-full py-6 rounded-xl font-semibold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                      color: 'white',
                      boxShadow: '0 10px 30px rgba(45, 106, 79, 0.3)'
                    }}
                  >
                    Book My Consultation
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}