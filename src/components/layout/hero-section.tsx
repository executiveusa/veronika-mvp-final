import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function HeroSection() {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 25%, #0F172A 50%, #1E1B4B 75%, #0F172A 100%)'
      }}
    >
      {/* Animated gradient orbs for depth */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Primary accent orb - top right */}
        <motion.div 
          animate={pulseAnimation}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(45, 106, 79, 0.4) 0%, transparent 70%)'
          }} 
        />
        {/* Secondary accent orb - bottom left */}
        <motion.div 
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 2 }
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(196, 69, 54, 0.3) 0%, transparent 70%)'
          }} 
        />
        {/* Subtle center glow */}
        <motion.div 
          animate={{
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 5, repeat: Infinity }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)'
          }} 
        />
      </motion.div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div 
        style={{ opacity }}
        className="container-max relative z-10 py-20 lg:py-0"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge with micro-animation */}
            <motion.div variants={itemVariants}>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-default"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.2) 0%, rgba(45, 106, 79, 0.1) 100%)',
                  border: '1px solid rgba(45, 106, 79, 0.3)',
                  color: '#4ADE80',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Sparkles className="h-4 w-4" />
                Strategic Business Partner
              </motion.span>
            </motion.div>

            {/* Headline with gradient text */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-white">{t('heroTitle').split(' ').slice(0, -2).join(' ')} </span>
              <span 
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #4ADE80 0%, #22D3EE 50%, #818CF8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {t('heroTitle').split(' ').slice(-2).join(' ')}
              </span>
            </motion.h1>

            {/* Subheadline with better contrast */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl max-w-xl leading-relaxed"
              style={{ color: 'rgba(226, 232, 240, 0.8)' }}
            >
              {t('heroDescription')}
            </motion.p>

            {/* CTAs with enhanced hover states */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/book">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    size="lg" 
                    className="text-lg font-semibold px-8 py-6 rounded-xl group relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                      boxShadow: '0 4px 20px rgba(45, 106, 79, 0.4), 0 0 40px rgba(45, 106, 79, 0.2)',
                      color: 'white'
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      {t('heroCta')}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>
              </Link>
              <a href="#services">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg font-semibold px-8 py-6 rounded-xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {t('heroCtaSecondary')}
                  </Button>
                </motion.div>
              </a>
            </motion.div>

            {/* Trust Elements with icons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium">{t('heroTrust')}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
                <Shield className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-medium">Trusted Advisor</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-sm font-medium">10+ Years Experience</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo/Visual with floating animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <motion.div 
              animate={floatingAnimation}
              className="relative"
            >
              {/* Main image container with glassmorphism */}
              <div 
                className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.3) 0%, rgba(99, 102, 241, 0.2) 50%, rgba(196, 69, 54, 0.2) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 80px rgba(45, 106, 79, 0.2)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Profile Photo */}
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5603AQHTx_PwHFN-9A/profile-displayphoto-crop_800_800/B56Ze1GQvOH8AI-/0/1751090007321?e=1768435200&v=beta&t=cfMMXrGdWVnwhucI95Vt_fZ1Tnb1NjZdeMhIMjMzpTU"
                  alt="Veronika Dimitrova - Strategic Business Consultant"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Subtle overlay for depth */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 40%)'
                  }}
                />
              </div>

              {/* Decorative floating elements */}
              <motion.div 
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.4) 0%, rgba(45, 106, 79, 0.1) 100%)',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <motion.div 
                animate={{ 
                  y: [5, -5, 5],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full -z-10"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(196, 69, 54, 0.3) 0%, rgba(196, 69, 54, 0.1) 100%)',
                  border: '1px solid rgba(196, 69, 54, 0.2)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 100%)'
        }}
      />
    </section>
  );
}
