import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// GSAP Configuration
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
});

// Premium animation presets for Veronika
export const animations = {
  // Hero entrance animation
  heroEntrance: (elements: string | Element | Element[]) => {
    const tl = gsap.timeline();
    
    tl.fromTo(elements, 
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      }
    );
    
    return tl;
  },

  // Luxury fade in with glow effect
  luxuryFadeIn: (element: string | Element, delay = 0) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        delay,
        ease: "power2.out",
      }
    );
  },

  // Glass card hover effect
  glassHover: (element: string | Element) => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      scale: 1.02,
      y: -5,
      duration: 0.3,
      ease: "power2.out",
    })
    .to(element, {
      boxShadow: "0 20px 60px -10px hsl(268 96% 53% / 0.4)",
      duration: 0.3,
      ease: "power2.out",
    }, 0);
    
    return tl;
  },

  // Floating animation for decorative elements
  float: (element: string | Element, intensity = 10) => {
    return gsap.to(element, {
      y: intensity,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  },

  // Text reveal animation
  textReveal: (element: string | Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 50,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power3.out",
      }
    );
  },

  // Scroll-triggered animations
  scrollTriggerFade: (element: string | Element, trigger?: string) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },

  // Gradient background animation
  gradientShift: (element: string | Element) => {
    return gsap.to(element, {
      backgroundPosition: "200% center",
      duration: 3,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  },

  // Premium button hover
  buttonHover: (element: string | Element) => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      scale: 1.05,
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    })
    .to(element, {
      boxShadow: "0 0 50px hsl(268 96% 53% / 0.6)",
      duration: 0.2,
      ease: "power2.out",
    }, 0);
    
    return tl;
  },
};

// Utility functions
export const initGSAP = () => {
  // Refresh ScrollTrigger on window resize
  ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.refresh());
  
  // Enable smooth scrolling for better performance
  ScrollTrigger.normalizeScroll(true);
  
  return {
    gsap,
    ScrollTrigger,
    animations,
  };
};

export { gsap, ScrollTrigger };
export default gsap;