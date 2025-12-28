import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/layout/hero-section';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { initGSAP } from '@/lib/gsap';

const Index = () => {
  const { t } = useTranslation('common');

  useEffect(() => {
    initGSAP();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container-max py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl font-display font-bold" style={{ color: 'hsl(153 41% 30%)' }}>Veronika</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('navMyStory')}
            </a>
            <a href="#services" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('navHowIHelp')}
            </a>
            <a href="#proof" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {t('navResults')}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Link to="/book">
              <Button className="btn-primary">
                {t('navLetsTalk')}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Section */}
      <section className="py-24" id="problem" style={{ backgroundColor: 'hsl(143 24% 56% / 0.1)' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
              {t('problemTitle')}
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-8">
            {[
              t('problemPoint1'),
              t('problemPoint2'),
              t('problemPoint3'),
              t('problemPoint4'),
            ].map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(8 57% 49% / 0.2)' }}>
                  <span className="font-bold" style={{ color: 'hsl(8 57% 49%)' }}>{index + 1}</span>
                </div>
                <p className="text-lg text-foreground/90">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-xl text-muted-foreground mt-12 italic"
          >
            {t('problemTransition')}
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background" id="about">
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
              <div className="aspect-[3/4] rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(to bottom right, hsl(153 41% 30% / 0.2), hsl(143 24% 56% / 0.2))' }}>
                {/* Replace with actual photo */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span>About Photo</span>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                {t('aboutTitle')}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('aboutParagraph1')}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('aboutParagraph2')}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('aboutParagraph3')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24" id="services" style={{ backgroundColor: 'hsl(35 43% 97%)' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              {t('servicesTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: t('service1Title'), hook: t('service1Hook'), desc: t('service1Desc'), outcome: t('service1Outcome') },
              { title: t('service2Title'), hook: t('service2Hook'), desc: t('service2Desc'), outcome: t('service2Outcome') },
              { title: t('service3Title'), hook: t('service3Hook'), desc: t('service3Desc'), outcome: t('service3Outcome') },
              { title: t('service4Title'), hook: t('service4Hook'), desc: t('service4Desc'), outcome: t('service4Outcome') },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-warm p-8 hover-lift"
              >
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="font-medium mb-4" style={{ color: 'hsl(153 41% 30%)' }}>{service.hook}</p>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <p className="text-sm text-foreground/80 italic border-t border-border pt-4">
                  → {service.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background" id="process">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'hsl(153 41% 30% / 0.1)' }}>
                  <span className="text-xl font-bold" style={{ color: 'hsl(153 41% 30%)' }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof/Testimonials Section */}
      <section className="py-24" id="proof" style={{ backgroundColor: 'hsl(35 43% 97%)' }}>
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              {t('proofTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-warm p-8"
              >
                <p className="text-foreground/90 mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  {testimonial.metric && (
                    <p className="text-sm font-medium mt-2" style={{ color: 'hsl(153 41% 30%)' }}>{testimonial.metric}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24" style={{ backgroundColor: 'hsl(153 41% 30%)' }}>
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-white/90">
              {t('ctaSubtitle')}
            </p>
            <Link to="/book">
              <Button size="lg" className="bg-white hover:bg-white/90 text-lg px-8" style={{ color: 'hsl(153 41% 30%)' }}>
                {t('ctaButton')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-white/70">{t('ctaReassurance')}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-display font-bold" style={{ color: 'hsl(153 41% 30%)' }}>Veronika</h3>
              <p className="text-sm text-muted-foreground">{t('footerTagline')}</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/veronikandimitrova/" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">{t('footerCopyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
