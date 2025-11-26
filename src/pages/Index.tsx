import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/layout/hero-section';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FolderOpen, 
  Receipt, 
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Sparkles
} from "lucide-react";
import { Link } from 'react-router-dom';
import { initGSAP } from '@/lib/gsap';

const Index = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    initGSAP();
  }, []);

  const services = [
    {
      icon: Users,
      title: t('clientManagement'),
      description: t('clientManagementDesc'),
      color: 'text-primary'
    },
    {
      icon: FolderOpen,
      title: t('projectTracking'),  
      description: t('projectTrackingDesc'),
      color: 'text-secondary'
    },
    {
      icon: Receipt,
      title: t('expenseManagement'),
      description: t('expenseManagementDesc'),
      color: 'text-accent'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container-max flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h2 className="text-xl font-display font-bold gradient-text">Veronika</h2>
              <p className="text-xs text-muted-foreground">Luxury Business Studio</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="outline" className="glass-strong border-glass-border">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container-max">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 glass-strong border-glass-border">
              {t('servicesTitle')}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold gradient-text mb-6">
              Executive-Grade Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sophisticated tools designed for discerning professionals who demand excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlassCard variant="strong" className="p-8 h-full hover:scale-105 transition-all duration-300 group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-2xl glass ${service.color} bg-opacity-10`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-display font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    <div className="pt-4">
                      <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="container-max">
          <GlassCard variant="strong" className="p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-6">
              Ready to Experience Luxury Business Management?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join executives who trust Veronika with their most important business operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book">
                <Button size="lg" className="btn-luxury px-8 py-4 text-lg">
                  {t('bookDemo')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="glass-strong border-glass-border px-8 py-4 text-lg">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 border-t border-glass-border/50">
        <div className="container-max text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text">Veronika</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Veronika N. Dimitrova. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;