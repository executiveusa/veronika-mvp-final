import { Navigation } from "@/components/layout/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div 
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
    >
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-20 left-1/4 w-[350px] h-[350px] rounded-full blur-[100px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(45, 106, 79, 0.4) 0%, transparent 70%)' }}
        />
      </div>
      
      <Navigation />
      <main className="relative z-10 flex-1 lg:p-6 p-4 pt-16 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}