import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources - Corrected positioning copy for Strategic Consultant
const resources = {
  en: {
    common: {
      // Navigation
      overview: 'Overview',
      clients: 'Clients',
      projects: 'Projects',
      expenses: 'Expenses',
      sessions: 'Sessions',
      bookings: 'Bookings',
      settings: 'Settings',
      
      // NEW Navigation Labels (Warm)
      navMyStory: 'My Story',
      navHowIHelp: 'How I Help',
      navResults: 'Real Results',
      navLetsTalk: "Let's Talk Strategy",
      
      // Hero Section - CORRECTED POSITIONING
      heroTitle: "Your Business Needs an Investor's Eye—Without the Investor",
      heroSubtitle: "Strategic clarity for founders who aren't ready for VCs yet",
      heroDescription: "I bring the same analytical rigor I used managing a \ portfolio to help you understand your metrics, find your growth levers, and make confident decisions.",
      heroCta: "Let's Talk Strategy",
      heroCtaSecondary: "See How I Work",
      heroTrust: "Former VC-side analyst. Now in your corner.",
      
      // LEGACY - Keep for compatibility but don't use
      bookDemo: "Let's Talk Strategy",
      learnMore: 'See How I Work',
      
      // Problem Section
      problemTitle: "Sound Familiar?",
      problemPoint1: "Your spreadsheets are a mess—and investor meetings are a scramble",
      problemPoint2: "You know something's off, but you can't pinpoint the leak",
      problemPoint3: "You're the CEO, CFO, and chief email responder all at once",
      problemPoint4: "Investors ask questions you don't have answers to",
      problemTransition: "What if someone who speaks both numbers and humans could help?",
      
      // Transformation Section
      transformTitle: "Imagine Instead...",
      transformPoint1: "Walking into investor meetings with confidence—not crossed fingers",
      transformPoint2: "Knowing exactly which metrics matter and why they're moving",
      transformPoint3: "Having someone in your corner who's seen this movie before",
      transformPoint4: "Finally freeing up your brain from the operational chaos",
      transformCta: "This is what I help you build",
      
      // About Section
      aboutTitle: "Hi, I'm Veronika",
      aboutParagraph1: "I spent years in corporate banking, managing \ million across SaaS, edtech, and consumer brands. I sat alongside VCs, assessing deal quality, forecasting demand, and learning what separates businesses that scale from those that stall.",
      aboutParagraph2: "But I also became a certified yoga teacher. Because I believe the best business decisions come from clarity—not chaos. And sometimes, you need both strategic rigor AND space to breathe.",
      aboutParagraph3: "Now, I bring that investor-grade lens to founders who need it most. You don't need a full-time CFO. You need someone who's been on the other side of the table and knows what they're looking for.",
      
      // Services Section - CORRECTED (Outcomes, not features)
      servicesTitle: 'How I Help',
      
      service1Title: 'Strategic Business Analysis',
      service1Hook: 'See your business the way investors do',
      service1Desc: "I help you understand what your metrics actually mean—where your growth levers are, and what red flags to fix before anyone else notices them.",
      service1Outcome: 'Confidence in your numbers. Clarity in your direction.',
      
      service2Title: 'Executive Support',
      service2Hook: 'Get your time back without losing control',
      service2Desc: 'Calendar, inbox, client care—handled with the precision I brought to managing multi-million dollar portfolios.',
      service2Outcome: 'Your operations run smoothly while you focus on growth.',
      
      service3Title: 'Presentation Content',
      service3Hook: 'Tell your story the way investors want to hear it',
      service3Desc: 'Pitch decks, strategy presentations, board updates—I help you frame your narrative for maximum impact.',
      service3Outcome: 'Presentations that close deals and inspire confidence.',
      
      service4Title: 'Wellness Content',
      service4Hook: 'For conscious businesses that need words with soul',
      service4Desc: 'Blog posts, bios, class descriptions for wellness brands. Building my portfolio here—ask about special rates.',
      service4Outcome: 'Content that resonates with your community.',
      
      // LEGACY Services - Keep for compatibility
      clientManagement: 'Client Management',
      clientManagementDesc: 'Sophisticated CRM with analytics and insights',
      projectTracking: 'Project Tracking',
      projectTrackingDesc: 'Elegant kanban boards and progress monitoring',
      expenseManagement: 'Expense Management',
      expenseManagementDesc: 'Streamlined financial tracking and reporting',
      
      // Proof Section
      proofTitle: 'Real Results',
      testimonial1Quote: "Veronika helped me see what I couldn't—that my unit economics were underwater. Three months later, we're profitable.",
      testimonial1Name: "Sarah Chen",
      testimonial1Role: "Founder, HealthStack",
      testimonial1Metric: "From -12% to +8% margins",
      
      testimonial2Quote: "I walked into my Series A pitch with confidence for the first time. She knows exactly what investors want to see.",
      testimonial2Name: "Marcus Thompson",
      testimonial2Role: "CEO, Revive Fitness",
      testimonial2Metric: "Raised \.3M",
      
      testimonial3Quote: "She took over my calendar chaos and gave me my mornings back. I actually have time to think now.",
      testimonial3Name: "Ana Reyes",
      testimonial3Role: "Founder, Mindful Studio",
      
      // Process Section
      processTitle: 'How It Works',
      processStep1Title: 'We Talk',
      processStep1Desc: "A free 30-minute call to understand your vision, challenges, and what's actually going on under the hood.",
      processStep2Title: 'We Plan',
      processStep2Desc: "I diagnose the gaps, propose a roadmap, and we decide on the scope that makes sense for you.",
      processStep3Title: 'We Execute',
      processStep3Desc: "Whether it's ongoing support or a focused project, I work alongside you—not above you.",
      processStep4Title: 'You Grow',
      processStep4Desc: "With clearer metrics, more time, and better decisions—you can finally focus on what matters.",
      
      // Final CTA
      ctaTitle: "Your Next Move Shouldn't Feel Like a Guess",
      ctaSubtitle: "Let's build the clarity you've been missing. One conversation is all it takes to start.",
      ctaButton: "Schedule Your Free Call",
      ctaReassurance: "No pitch. No pressure. Just a real conversation.",
      
      // Dashboard
      totalClients: 'Active Clients',
      activeProjects: 'Active Projects',
      monthlyRevenue: 'Revenue (30d)',
      upcomingSessions: 'Upcoming Sessions',
      upcomingTasks: 'Upcoming Tasks',
      recentProjects: 'Recent Projects',
      welcomeBack: "Welcome back! Here's what's happening.",
      
      // Actions
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      view: 'View',
      learnMoreAction: 'Learn More',
      
      // Status
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      draft: 'Draft',
      
      // Footer
      footerTagline: 'Strategy, Soul & Structure',
      footerCopyright: '© 2025 Veronika N. Dimitrova. All rights reserved.',
    }
  },
  bg: {
    common: {
      // Navigation
      overview: 'Преглед',
      clients: 'Клиенти',
      projects: 'Проекти',
      expenses: 'Разходи',
      sessions: 'Сесии',
      bookings: 'Резервации',
      settings: 'Настройки',
      
      // Navigation Labels
      navMyStory: 'Моята история',
      navHowIHelp: 'Как помагам',
      navResults: 'Резултати',
      navLetsTalk: 'Да поговорим',
      
      // Hero
      heroTitle: 'Вашият бизнес има нужда от инвеститорски поглед—без инвеститор',
      heroSubtitle: 'Стратегическа яснота за основатели',
      heroDescription: 'Внасям същата аналитична прецизност, която използвах управлявайки портфолио от \, за да ви помогна да разберете метриките си и да вземате уверени решения.',
      heroCta: 'Да поговорим за стратегия',
      heroCtaSecondary: 'Вижте как работя',
      heroTrust: 'Бивш анализатор от страната на VC. Сега във вашия ъгъл.',
      
      bookDemo: 'Да поговорим за стратегия',
      learnMore: 'Научи повече',
      
      // Problem Section
      problemTitle: "Познато ли ви е?",
      problemPoint1: "Таблиците ви са хаос—а срещите с инвеститори са паника",
      problemPoint2: "Знаете, че нещо не е наред, но не можете да откриете къде",
      problemPoint3: "Вие сте CEO, CFO и главен отговорник на имейлите наведнъж",
      problemPoint4: "Инвеститорите задават въпроси, на които нямате отговори",
      problemTransition: "Ами ако някой, който говори и на числа, и на хора, може да помогне?",
      
      // About Section
      aboutTitle: "Здравейте, аз съм Вероника",
      aboutParagraph1: "Прекарах години в корпоративно банкиране, управлявайки \ милиона в SaaS, edtech и потребителски марки. Седях до VC-та, оценявайки качеството на сделки и учейки какво отличава бизнесите, които растат.",
      aboutParagraph2: "Но станах и сертифициран йога учител. Защото вярвам, че най-добрите бизнес решения идват от яснота—не от хаос.",
      aboutParagraph3: "Сега нося тази инвеститорска перспектива на основатели, които имат най-голяма нужда от нея.",
      
      // Services
      servicesTitle: 'Как помагам',
      service1Title: 'Стратегически бизнес анализ',
      service1Hook: 'Вижте бизнеса си през очите на инвеститорите',
      service1Desc: 'Помагам ви да разберете какво всъщност означават метриките ви.',
      service1Outcome: 'Увереност в числата. Яснота в посоката.',
      
      service2Title: 'Изпълнителна поддръжка',
      service2Hook: 'Върнете времето си без да губите контрол',
      service2Desc: 'Календар, имейл, грижа за клиенти—с прецизността от управление на милионни портфолиа.',
      service2Outcome: 'Операциите ви вървят гладко, докато се фокусирате върху растеж.',
      
      service3Title: 'Съдържание за презентации',
      service3Hook: 'Разкажете историята си както инвеститорите искат да я чуят',
      service3Desc: 'Pitch decks, стратегически презентации, борд ъпдейти.',
      service3Outcome: 'Презентации, които затварят сделки.',
      
      service4Title: 'Уелнес съдържание',
      service4Hook: 'За съзнателни бизнеси с нужда от думи с душа',
      service4Desc: 'Блог постове, биографии, описания на класове за уелнес марки.',
      service4Outcome: 'Съдържание, което резонира с вашата общност.',
      
      // LEGACY Services
      clientManagement: 'Управление на клиенти',
      clientManagementDesc: 'Софистицирана CRM система с анализи',
      projectTracking: 'Проследяване на проекти',
      projectTrackingDesc: 'Канбан дъски и мониторинг',
      expenseManagement: 'Управление на разходи',
      expenseManagementDesc: 'Финансово проследяване и отчитане',
      
      // Process
      processTitle: 'Как работи',
      processStep1Title: 'Говорим',
      processStep1Desc: 'Безплатен 30-минутен разговор да разбера визията и предизвикателствата ви.',
      processStep2Title: 'Планираме',
      processStep2Desc: 'Диагностицирам пропуските, предлагам пътна карта.',
      processStep3Title: 'Изпълняваме',
      processStep3Desc: 'Работя заедно с вас—не над вас.',
      processStep4Title: 'Растете',
      processStep4Desc: 'С по-ясни метрики, повече време и по-добри решения.',
      
      // CTA
      ctaTitle: "Следващата ви стъпка не трябва да е на сляпо",
      ctaSubtitle: "Да изградим яснотата, която ви липсва. Един разговор е всичко, от което имате нужда.",
      ctaButton: "Резервирайте безплатен разговор",
      ctaReassurance: "Без натиск. Просто истински разговор.",
      
      // Dashboard
      totalClients: 'Активни клиенти',
      activeProjects: 'Активни проекти',
      monthlyRevenue: 'Приходи (30д)',
      upcomingSessions: 'Предстоящи сесии',
      upcomingTasks: 'Предстоящи задачи',
      recentProjects: 'Скорошни проекти',
      welcomeBack: "Добре дошли отново! Ето какво се случва.",
      
      // Actions
      add: 'Добави',
      edit: 'Редактирай',
      delete: 'Изтрий',
      save: 'Запази',
      cancel: 'Отмени',
      view: 'Виж',
      learnMoreAction: 'Научи повече',
      
      // Status
      active: 'Активен',
      inactive: 'Неактивен',
      pending: 'В очакване',
      completed: 'Завършен',
      draft: 'Чернова',
      
      // Footer
      footerTagline: 'Стратегия, душа и структура',
      footerCopyright: '© 2025 Вероника Н. Димитрова. Всички права запазени.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      useSuspense: false,
    }
  });

export default i18n;
