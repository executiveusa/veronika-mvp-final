import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ backgroundColor: 'hsl(35 43% 97%)' }}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'hsl(153 41% 30% / 0.05)' }} />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'hsl(8 57% 49% / 0.05)' }} />
      </div>

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: 'hsl(153 41% 30% / 0.1)', color: 'hsl(153 41% 30%)' }}>
                Strategic Business Partner
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight"
            >
              {t('heroTitle')}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              {t('heroDescription')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link to="/book">
                <Button size="lg" className="btn-primary text-lg group">
                  {t('heroCta')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#services">
                <Button size="lg" variant="outline" className="btn-secondary text-lg">
                  {t('heroCtaSecondary')}
                </Button>
              </a>
            </motion.div>

            {/* Trust Element */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <CheckCircle className="h-5 w-5" style={{ color: 'hsl(153 41% 30%)' }} />
              <span className="text-sm">{t('heroTrust')}</span>
            </motion.div>
          </motion.div>

          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(to bottom right, hsl(153 41% 30% / 0.2), hsl(8 57% 49% / 0.2))' }}>
              {/* Replace with actual photo */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="text-lg">Photo of Veronika</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl -z-10" style={{ backgroundColor: 'hsl(153 41% 30% / 0.1)' }} />
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full -z-10" style={{ backgroundColor: 'hsl(8 57% 49% / 0.1)' }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
