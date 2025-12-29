import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, FileText, Calendar, Tag, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  color: string;
}

const mockNotes: Note[] = [
  { 
    id: "1", 
    title: "Client Meeting Notes", 
    content: "Discussed Q1 strategy with TechCorp. Key priorities: mobile app launch, marketing budget increase, new hire onboarding...", 
    category: "Meetings", 
    date: "Dec 28, 2024",
    color: "#818CF8"
  },
  { 
    id: "2", 
    title: "Project Ideas", 
    content: "Potential new service offerings: AI consulting, automation packages, training workshops for teams...", 
    category: "Ideas", 
    date: "Dec 26, 2024",
    color: "#4ADE80"
  },
  { 
    id: "3", 
    title: "Financial Planning", 
    content: "Review Q4 expenses, prepare tax documents, update pricing structure for 2025...", 
    category: "Finance", 
    date: "Dec 24, 2024",
    color: "#FBBF24"
  },
  { 
    id: "4", 
    title: "Marketing Strategy", 
    content: "Social media content calendar, LinkedIn outreach plan, newsletter improvements...", 
    category: "Marketing", 
    date: "Dec 22, 2024",
    color: "#38BDF8"
  },
  { 
    id: "5", 
    title: "Personal Goals", 
    content: "Complete certification by March, attend 2 industry conferences, expand network in tech sector...", 
    category: "Personal", 
    date: "Dec 20, 2024",
    color: "#F472B6"
  },
  { 
    id: "6", 
    title: "Client Feedback Summary", 
    content: "Key themes from recent surveys: faster response times, more detailed reports, flexible scheduling...", 
    category: "Feedback", 
    date: "Dec 18, 2024",
    color: "#A78BFA"
  },
];

const categories = ["All", "Meetings", "Ideas", "Finance", "Marketing", "Personal", "Feedback"];

export default function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
              Notes
            </h1>
            <p style={{ color: 'rgba(226, 232, 240, 0.6)' }}>Capture ideas, meeting notes, and important information</p>
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
              New Note
            </Button>
          </motion.div>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(226, 232, 240, 0.4)' }} />
            <Input
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-0 text-white placeholder:text-white/30"
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeCategory === category 
                    ? 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  color: activeCategory === category ? 'white' : 'rgba(226, 232, 240, 0.7)',
                  border: activeCategory === category ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Notes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl relative group"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Color accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: note.color }}
              />
              
              {/* Actions dropdown */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="rounded-xl"
                    style={{
                      background: 'rgba(30, 41, 59, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <DropdownMenuItem className="text-white hover:bg-white/10">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3 mt-2">
                <h3 className="font-semibold text-white text-lg">{note.title}</h3>
                <p className="text-sm line-clamp-3" style={{ color: 'rgba(226, 232, 240, 0.6)' }}>
                  {note.content}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium"
                    style={{ background: `${note.color}20`, color: note.color }}
                  >
                    <Tag className="h-3 w-3" />
                    {note.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: 'rgba(226, 232, 240, 0.4)' }}>
                    <Calendar className="h-3 w-3" />
                    {note.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
