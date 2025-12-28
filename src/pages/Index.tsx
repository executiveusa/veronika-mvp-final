import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { HeroSection } from '@/components/layout/hero-section';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Users, Target, Lightbulb, Rocket, Quote } from "lucide-react";
import { Link } from 'react-router-dom';
import { initGSAP } from '@/lib/gsap';

const Index = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    initGSAP();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header - Transparent on hero, solid on scroll */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: isScrolled 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <div className="container-max py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <motion.span 
              className="text-2xl font-display font-bold"
              whileHover={{ scale: 1.05 }}
              style={{ 
                background: 'linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Veronika
            </motion.span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '#about', label: t('navMyStory') },
              { href: '#services', label: t('navHowIHelp') },
              { href: '#proof', label: t('navResults') },
            ].map((link) => (
              <motion.a 
                key={link.href}
                href={link.href} 
                className="text-sm font-medium transition-colors relative group"
                style={{ color: 'rgba(226, 232, 240, 0.8)' }}
                whileHover={{ color: '#4ADE80' }}
              >
                {link.label}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Link to="/book">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="font-semibold px-6"
                  style={{
                    background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(45, 106, 79, 0.3)'
                  }}
                >
                  {t('navLetsTalk')}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section - Dark theme continuation */}
      <section 
        className="py-24 relative overflow-hidden" 
        id="problem" 
        style={{ 
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
        }}
      >
        {/* Subtle accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(196, 69, 54, 0.4) 0%, transparent 70%)' }} 
        />
        
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ 
                background: 'rgba(196, 69, 54, 0.15)',
                border: '1px solid rgba(196, 69, 54, 0.3)',
                color: '#FB7185'
              }}
            >
              <Target className="h-4 w-4" />
              Common Challenges
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight"
              style={{ color: 'white' }}
            >
              {t('problemTitle')}
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              t('problemPoint1'),
              t('problemPoint2'),
              t('problemPoint3'),
              t('problemPoint4'),
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-6 rounded-2xl cursor-default"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(196, 69, 54, 0.3) 0%, rgba(196, 69, 54, 0.1) 100%)',
                    border: '1px solid rgba(196, 69, 54, 0.3)'
                  }}
                >
                  <span className="font-bold text-rose-400">{index + 1}</span>
                </div>
                <p className="text-lg leading-relaxed" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-xl mt-12 italic"
            style={{ color: 'rgba(226, 232, 240, 0.6)' }}
          >
            {t('problemTransition')}
          </motion.p>
        </div>
      </section>

      {/* About Section - Light contrast for variety */}
      <section className="py-24 relative overflow-hidden" id="about" style={{ background: '#FAFBFC' }}>
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div 
                className="aspect-[3/4] rounded-3xl overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  boxShadow: '0 25px 50px -12px rgba(45, 106, 79, 0.3)'
                }}
              >
                <img 
                  src="https://media.licdn.com/dms/image/v2/D5603AQHTx_PwHFN-9A/profile-displayphoto-crop_800_800/B56Ze1GQvOH8AI-/0/1751090007321?e=1768435200&v=beta&t=cfMMXrGdWVnwhucI95Vt_fZ1Tnb1NjZdeMhIMjMzpTU"
                  alt="Veronika Dimitrova - Strategic Business Consultant"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Subtle overlay for depth */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(45, 106, 79, 0.3) 0%, transparent 50%)'
                  }}
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-2xl -z-10"
                style={{ background: 'linear-gradient(135deg, #C44536 0%, #E76F51 100%)', opacity: 0.8 }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ 
                  background: 'rgba(45, 106, 79, 0.1)',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                  color: '#2D6A4F'
                }}
              >
                <Users className="h-4 w-4" />
                About Me
              </motion.span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight"
                style={{ color: '#1A1A1A' }}
              >
                {t('aboutTitle')}
              </h2>
              
              <p className="text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                {t('aboutParagraph1')}
              </p>
              
              <p className="text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                {t('aboutParagraph2')}
              </p>
              
              <p className="text-lg leading-relaxed" style={{ color: '#4A4A4A' }}>
                {t('aboutParagraph3')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Dark elegant */}
      <section 
        className="py-24 relative overflow-hidden" 
        id="services" 
        style={{ 
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)'
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(45, 106, 79, 0.5) 0%, transparent 70%)' }} 
        />
        
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ 
                background: 'rgba(45, 106, 79, 0.15)',
                border: '1px solid rgba(45, 106, 79, 0.3)',
                color: '#4ADE80'
              }}
            >
              <Lightbulb className="h-4 w-4" />
              Services
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
              {t('servicesTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: t('service1Title'), hook: t('service1Hook'), desc: t('service1Desc'), outcome: t('service1Outcome'), icon: TrendingUp },
              { title: t('service2Title'), hook: t('service2Hook'), desc: t('service2Desc'), outcome: t('service2Outcome'), icon: Users },
              { title: t('service3Title'), hook: t('service3Hook'), desc: t('service3Desc'), outcome: t('service3Outcome'), icon: Target },
              { title: t('service4Title'), hook: t('service4Hook'), desc: t('service4Desc'), outcome: t('service4Outcome'), icon: Rocket },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="p-8 rounded-2xl group cursor-default"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.3) 0%, rgba(45, 106, 79, 0.1) 100%)',
                    border: '1px solid rgba(45, 106, 79, 0.3)'
                  }}
                >
                  <service.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="font-medium mb-4 text-emerald-400">{service.hook}</p>
                <p className="mb-4" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>{service.desc}</p>
                <p className="text-sm italic pt-4" style={{ color: 'rgba(226, 232, 240, 0.5)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  → {service.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Light for contrast */}
      <section className="py-24 relative" id="process" style={{ background: '#FAFBFC' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ 
                background: 'rgba(45, 106, 79, 0.1)',
                border: '1px solid rgba(45, 106, 79, 0.2)',
                color: '#2D6A4F'
              }}
            >
              <Sparkles className="h-4 w-4" />
              How We Work
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold" style={{ color: '#1A1A1A' }}>
              {t('processTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: t('processStep1Title'), desc: t('processStep1Desc'), num: '01' },
              { title: t('processStep2Title'), desc: t('processStep2Desc'), num: '02' },
              { title: t('processStep3Title'), desc: t('processStep3Desc'), num: '03' },
              { title: t('processStep4Title'), desc: t('processStep4Desc'), num: '04' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)',
                    boxShadow: '0 10px 30px rgba(45, 106, 79, 0.3)'
                  }}
                >
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </motion.div>
                <h3 className="text-lg font-display font-semibold mb-3" style={{ color: '#1A1A1A' }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof/Testimonials Section - Dark elegant */}
      <section 
        className="py-24 relative overflow-hidden" 
        id="proof" 
        style={{ 
          background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)' }} 
        />
        
        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ 
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#A5B4FC'
              }}
            >
              <Quote className="h-4 w-4" />
              Testimonials
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
              {t('proofTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: t('testimonial1Quote'), name: t('testimonial1Name'), role: t('testimonial1Role'), metric: t('testimonial1Metric') },
              { quote: t('testimonial2Quote'), name: t('testimonial2Name'), role: t('testimonial2Role'), metric: t('testimonial2Metric') },
              { quote: t('testimonial3Quote'), name: t('testimonial3Name'), role: t('testimonial3Role') },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Quote className="h-8 w-8 mb-4 text-indigo-400 opacity-50" />
                <p className="mb-6 italic text-lg leading-relaxed" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                  "{testimonial.quote}"
                </p>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{testimonial.role}</p>
                  {testimonial.metric && (
                    <p className="text-sm font-medium mt-2 text-emerald-400">{testimonial.metric}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Gradient for impact */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #2D6A4F 0%, #40916C 50%, #84A98C 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)' }} 
          />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)' }} 
          />
        </div>
        
        <div className="container-max text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="h-12 w-12 mx-auto mb-4 text-white/80" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-white/90">
              {t('ctaSubtitle')}
            </p>
            <Link to="/book">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 rounded-xl font-semibold group"
                  style={{ 
                    background: 'white',
                    color: '#2D6A4F',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {t('ctaButton')}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </Link>
            <p className="text-sm text-white/70">{t('ctaReassurance')}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Dark sleek */}
      <footer 
        className="py-16 relative"
        style={{ background: '#0F172A' }}
      >
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 
                className="text-2xl font-display font-bold mb-2"
                style={{ 
                  background: 'linear-gradient(135deg, #4ADE80 0%, #22D3EE 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Veronika
              </h3>
              <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>{t('footerTagline')}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <motion.a 
                href="https://www.linkedin.com/in/veronikandimitrova/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#4ADE80' }}
                className="transition-colors"
                style={{ color: 'rgba(226, 232, 240, 0.7)' }}
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <p className="text-sm" style={{ color: 'rgba(226, 232, 240, 0.4)' }}>{t('footerCopyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
