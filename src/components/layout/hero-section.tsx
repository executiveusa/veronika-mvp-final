import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowRight, Sparkles, Crown, Star } from 'lucide-react';
import { gsap, animations } from '@/lib/gsap';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { t } = useTranslation('common');
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Main hero entrance animation
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo(titleRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      })
      .fromTo(subtitleRef.current, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.8")
      .fromTo(descriptionRef.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.6")
      .fromTo(buttonsRef.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

      // Floating decorative elements
      if (decorativeRef.current) {
        const decorativeElements = decorativeRef.current.children;
        Array.from(decorativeElements).forEach((element, index) => {
          animations.float(element, 15 + index * 5);
        });
      }

      // Gradient background animation
      gsap.set(heroRef.current, {
        backgroundImage: `
          radial-gradient(circle at 20% 80%, hsl(268 96% 53% / 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, hsl(185 94% 45% / 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, hsl(280 100% 70% / 0.1) 0%, transparent 50%)
        `,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-8"
    >
      {/* Decorative floating elements */}
      <div ref={decorativeRef} className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 text-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="h-8 w-8" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20 text-secondary/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-20 text-accent/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Star className="h-7 w-7" />
        </motion.div>
      </div>

      <div className="container-max text-center relative z-10">
        <GlassCard variant="strong" className="max-w-5xl mx-auto p-8 sm:p-12 lg:p-16">
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-6">
              <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight"
              >
                <span className="gradient-text">
                  {t('heroTitle')}
                </span>
              </h1>
              
              <p 
                ref={subtitleRef}
                className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light max-w-4xl mx-auto"
              >
                {t('heroSubtitle')}
              </p>
              
              <p 
                ref={descriptionRef}
                className="text-lg text-card-foreground/80 max-w-3xl mx-auto leading-relaxed"
              >
                {t('heroDescription')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/book">
                <Button 
                  size="lg" 
                  className="btn-luxury px-8 py-4 text-lg font-semibold group"
                >
                  {t('bookDemo')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glass-strong border-glass-border hover:bg-primary/10 px-8 py-4 text-lg"
                >
                  {t('learnMore')}
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-glass-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by premium professionals worldwide
              </p>
              <div className="flex justify-center items-center gap-8 opacity-60">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-secondary" />
                  ))}
                </div>
                <span className="text-sm font-medium">500+ Executive Clients</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}