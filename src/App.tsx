import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/theme-context";
import { AuthProvider } from "@/contexts/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/dashboard/Clients";
import Projects from "./pages/dashboard/Projects";
import Expenses from "./pages/dashboard/Expenses";
import Bookings from "./pages/dashboard/Bookings";
import Payments from "./pages/dashboard/Payments";
import Notes from "./pages/dashboard/Notes";
import Settings from "./pages/dashboard/Settings";
import BookDemo from "./pages/BookDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/book" element={<BookDemo />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/clients" element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/expenses" element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/bookings" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/payments" element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/notes" element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
