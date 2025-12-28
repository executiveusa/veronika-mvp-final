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
      
      // Transformation Section
      transformTitle: "Представи си вместо това...",
      transformPoint1: "Влизаш в срещи с инвеститори с увереност—не с пръсти кръстосани",
      transformPoint2: "Знаеш точно какви метрики важат и защо се движат",
      transformPoint3: "Имаш някого в своя ъгъл, който е видял този филм преди",
      transformPoint4: "Накрая се освобождаваш от оперативния хаос",
      transformCta: "Това е това, което те помагам да построиш",
      
      // About Section
      aboutTitle: "Здравейте, аз съм Вероника",
      aboutParagraph1: "Прекарах години в корпоративно банкиране, управлявайки \ милиона в SaaS, edtech и потребителски марки. Седях до VC-та, оценявайки качеството на сделки и учейки какво отличава бизнесите, които растат.",
      aboutParagraph2: "Но станах и сертифициран йога учител. Защото вярвам, че най-добрите бизнес решения идват от яснота—не от хаос.",
      aboutParagraph3: "Сега нося тази инвеститорска перспектива на основатели, които имат най-голяма нужда от нея.",
      
      // Services
      servicesTitle: 'Как помагам',
      service1Title: 'Стратегически бизнес анализ',
      service1Hook: 'Вижте бизнеса си през очите на инвеститорите',
      service1Desc: 'Помагам ви да разберете какво всъщност означават метриките ви—където са вашите палачи на растеж и какви червени флага да коригирате преди да ги забележи някой.',
      service1Outcome: 'Увереност в числата. Яснота в посоката.',
      
      service2Title: 'Изпълнителна поддръжка',
      service2Hook: 'Върнете времето си без да губите контрол',
      service2Desc: 'Календар, имейл, грижа за клиенти—с прецизността от управление на милионни портфолиа.',
      service2Outcome: 'Операциите ви вървят гладко, докато се фокусирате върху растеж.',
      
      service3Title: 'Съдържание за презентации',
      service3Hook: 'Разкажете историята си както инвеститорите искат да я чуят',
      service3Desc: 'Pitch decks, стратегически презентации, актуализации на борда—помагам ви да поставите вашата наративост за максимално въздействие.',
      service3Outcome: 'Презентации, които затварят сделки и вдъхновяват доверие.',
      
      service4Title: 'Уелнес съдържание',
      service4Hook: 'За съзнателни бизнеси с нужда от думи с душа',
      service4Desc: 'Блог постове, биографии, описания на класове за уелнес марки. Строя своя портфолио тук—попитай за специални тарифи.',
      service4Outcome: 'Съдържание, което резонира с вашата общност.',
      
      // LEGACY Services
      clientManagement: 'Управление на клиенти',
      clientManagementDesc: 'Софистицирана CRM система с анализи',
      projectTracking: 'Проследяване на проекти',
      projectTrackingDesc: 'Канбан дъски и мониторинг',
      expenseManagement: 'Управление на разходи',
      expenseManagementDesc: 'Финансово проследяване и отчитане',
      
      // Proof Section
      proofTitle: 'Реални резултати',
      testimonial1Quote: "Вероника ми помогна да видя това, което не можех—че моята единична икономика беше под вода. Три месеца по-късно, ние сме печеливши.",
      testimonial1Name: "Sarah Chen",
      testimonial1Role: "Основателка, HealthStack",
      testimonial1Metric: "От -12% до +8% маржинаж",
      
      testimonial2Quote: "Влязох в моя pitch от Serie A с увереност за първи път. Тя знае точно какво искат да видят инвеститорите.",
      testimonial2Name: "Marcus Thompson",
      testimonial2Role: "CEO, Revive Fitness",
      testimonial2Metric: "Събра $1.3M",
      
      testimonial3Quote: "Преде своята календар на хаоса и ми върна своите сутрин. Накрая имам време да мисля.",
      testimonial3Name: "Ana Reyes",
      testimonial3Role: "Основателка, Mindful Studio",
      
      // Process
      processTitle: 'Как работи',
      processStep1Title: 'Говорим',
      processStep1Desc: 'Безплатен 30-минутен разговор да разбера визията, предизвикателствата и какво точно се случва под повърхността.',
      processStep2Title: 'Планираме',
      processStep2Desc: 'Диагностицирам пропуските, предлагам пътна карта и решаваме обхвата, който има смисъл за теб.',
      processStep3Title: 'Изпълняваме',
      processStep3Desc: 'Независимо дали е постоянна подкрепа или сфокусиран проект, работя с тебе—не над теб.',
      processStep4Title: 'Растеш',
      processStep4Desc: 'С по-ясни метрики, повече време и по-добри решения—накрая можеш да се фокусираш върху това, което има значение.',
      
      // CTA
      ctaTitle: "Следващата ти стъпка не трябва да бъде на сляпо",
      ctaSubtitle: "Да построим яснотата, която ти липсва. Един разговор е всичко, което ти трябва, за да започнеш.",
      ctaButton: "Резервирай своята безплатна позвана",
      ctaReassurance: "Без pitch. Без натиск. Просто истински разговор.",
      
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
      
      // Book Demo Page
      backToHome: 'Назад в началото',
      bookYourDemo: 'Резервирай своя демо',
      demoSubtitle: 'Насрочи персонализиран демо, за да видиш как Вероника може да трансформира работния ти поток.',
      whatToExpect: 'Какво да очакваш',
      demoMinutes30: '30-минутна сесия',
      demoMinutesDesc: 'Всеобхватен преглед на всички функции',
      personalizedDemo: 'Персонализиран демо',
      personalizedDemoDesc: 'Коригиран според нуждите на твоя бизнес',
      qaSession: 'Сесия за въпроси',
      qaSessionDesc: 'Получи отговори на всички твои въпроси',
      demoFeatures: 'Функции на демото',
      featureClientManagement: 'Управление на клиенти и проекти',
      featureTaskTracking: 'Следене на задачи и Канбан дъски',
      featureInvoicing: 'Обработка на фактури и плащания',
      featureAnalytics: 'Анализи и отчети',
      scheduleYourDemo: 'Насрочи своя демо',
      fullName: 'Пълно име',
      email: 'Имейл',
      company: 'Компания',
      preferredDate: 'Предпочитана дата',
      preferredTime: 'Предпочитано време',
      additionalMessage: 'Допълнително съобщение',
      bookMyDemo: 'Резервирай моя демо',
      businessNeeds: 'Разкажи ни за нуждите на твоя бизнес...',
      missingInformation: 'Липсва информация',
      pleaseFilFill: 'Моля, попълни всички задължителни полета и избери час.',
      demoBookedTitle: 'Демо Резервирано!',
      demoBookedSuccess: 'Демото ти е насрочено за {date} в {time}. Ще ти изпратим потвърдително писмо с детайлите на срещата.',
      demoBookedButton: 'Назад в началото',
      
      // Footer
      footerTagline: 'Стратегия, душа и структура',
      footerCopyright: '© 2025 Вероника Н. Димитрова. Всички права запазени.',
    }
  },
  'es-MX': {
    common: {
      // Navigation
      overview: 'Resumen',
      clients: 'Clientes',
      projects: 'Proyectos',
      expenses: 'Gastos',
      sessions: 'Sesiones',
      bookings: 'Reservas',
      settings: 'Configuración',
      
      // Navigation Labels
      navMyStory: 'Mi Historia',
      navHowIHelp: 'Cómo Ayudo',
      navResults: 'Resultados Reales',
      navLetsTalk: 'Hablemos de Estrategia',
      
      // Hero Section
      heroTitle: "Tu Negocio Necesita la Visión de un Inversionista—Sin el Inversionista",
      heroSubtitle: "Claridad estratégica para fundadores que no están listos para VCs aún",
      heroDescription: "Traigo el mismo rigor analítico que usé para gestionar un portafolio para ayudarte a entender tus métricas, encontrar tus palancas de crecimiento y tomar decisiones con confianza.",
      heroCta: "Hablemos de Estrategia",
      heroCtaSecondary: "Ve Cómo Trabajo",
      heroTrust: "Ex analista de VC. Ahora en tu equipo.",
      
      // LEGACY
      bookDemo: "Hablemos de Estrategia",
      learnMore: 'Ve Cómo Trabajo',
      
      // Problem Section
      problemTitle: "¿Te Suena Familiar?",
      problemPoint1: "Tus hojas de cálculo son un caos—y las reuniones con inversionistas son un pánico",
      problemPoint2: "Sabes que algo anda mal, pero no puedes encontrar dónde está la fuga",
      problemPoint3: "Eres el CEO, CFO y principal respondedor de correos todo a la vez",
      problemPoint4: "Los inversionistas hacen preguntas que no puedes responder",
      problemTransition: "¿Y si alguien que habla tanto de números como de personas pudiera ayudarte?",
      
      // Transformation Section
      transformTitle: "Imagina en Su Lugar...",
      transformPoint1: "Entrar a reuniones con inversionistas con confianza—no con los dedos cruzados",
      transformPoint2: "Saber exactamente qué métricas importan y por qué se están moviendo",
      transformPoint3: "Tener a alguien en tu equipo que ha visto esta película antes",
      transformPoint4: "Finalmente liberarte del caos operacional",
      transformCta: "Esto es lo que te ayudo a construir",
      
      // About Section
      aboutTitle: "Hola, soy Veronika",
      aboutParagraph1: "Pasé años en banca corporativa, gestionando millones de dólares en SaaS, edtech y marcas de consumidor. Me sentaba junto a VCs, evaluando la calidad de los tratos, pronosticando demanda y aprendiendo qué separa a los negocios que escalan de aquellos que se estancan.",
      aboutParagraph2: "Pero también me volví instructora certificada de yoga. Porque creo que las mejores decisiones de negocio vienen de la claridad—no del caos. Y a veces, necesitas tanto rigor estratégico como espacio para respirar.",
      aboutParagraph3: "Ahora traigo esa lente de inversionista a fundadores que más la necesitan. No necesitas un CFO de tiempo completo. Necesitas a alguien que ha estado del otro lado de la mesa y sabe qué buscan.",
      
      // Services Section
      servicesTitle: 'Cómo Ayudo',
      
      service1Title: 'Análisis Estratégico del Negocio',
      service1Hook: 'Ve tu negocio como lo ven los inversionistas',
      service1Desc: "Te ayudo a entender qué significan realmente tus métricas—dónde están tus palancas de crecimiento y qué banderas rojas arreglar antes de que alguien más las note.",
      service1Outcome: 'Confianza en tus números. Claridad en tu dirección.',
      
      service2Title: 'Apoyo Ejecutivo',
      service2Hook: 'Recupera tu tiempo sin perder el control',
      service2Desc: 'Calendario, bandeja de entrada, atención al cliente—manejado con la precisión que traje a la gestión de portafolios de millones.',
      service2Outcome: 'Tus operaciones funcionan sin problemas mientras te enfocas en el crecimiento.',
      
      service3Title: 'Contenido de Presentaciones',
      service3Hook: 'Cuenta tu historia como los inversionistas quieren escucharla',
      service3Desc: 'Pitch decks, presentaciones estratégicas, actualizaciones de junta—te ayudo a enmarcar tu narrativa para máximo impacto.',
      service3Outcome: 'Presentaciones que cierran tratos e inspiran confianza.',
      
      service4Title: 'Contenido de Bienestar',
      service4Hook: 'Para negocios conscientes que necesitan palabras con alma',
      service4Desc: 'Publicaciones de blog, biografías, descripciones de clases para marcas de bienestar. Estoy construyendo mi portafolio aquí—pregunta por tarifas especiales.',
      service4Outcome: 'Contenido que resuena con tu comunidad.',
      
      // LEGACY Services
      clientManagement: 'Gestión de Clientes',
      clientManagementDesc: 'CRM sofisticado con análisis e información',
      projectTracking: 'Seguimiento de Proyectos',
      projectTrackingDesc: 'Tableros Kanban elegantes y monitoreo de progreso',
      expenseManagement: 'Gestión de Gastos',
      expenseManagementDesc: 'Seguimiento financiero y reportes optimizados',
      
      // Proof Section
      proofTitle: 'Resultados Reales',
      testimonial1Quote: "Veronika me ayudó a ver lo que no podía—que mi economía unitaria estaba bajo el agua. Tres meses después, somos rentables.",
      testimonial1Name: "Sarah Chen",
      testimonial1Role: "Fundadora, HealthStack",
      testimonial1Metric: "De -12% a +8% márgenes",
      
      testimonial2Quote: "Entré en mi pitch de Serie A con confianza por primera vez. Ella sabe exactamente qué quieren ver los inversionistas.",
      testimonial2Name: "Marcus Thompson",
      testimonial2Role: "CEO, Revive Fitness",
      testimonial2Metric: "Recaudó $1.3M",
      
      testimonial3Quote: "Se hizo cargo del caos de mi calendario y me devolvió mis mañanas. Finalmente tengo tiempo para pensar.",
      testimonial3Name: "Ana Reyes",
      testimonial3Role: "Fundadora, Mindful Studio",
      
      // Process Section
      processTitle: 'Cómo Funciona',
      processStep1Title: 'Nos Conocemos',
      processStep1Desc: "Una llamada gratis de 30 minutos para entender tu visión, desafíos y qué está realmente pasando bajo la superficie.",
      processStep2Title: 'Planeamos',
      processStep2Desc: "Diagnostico las brechas, propongo un plan de ruta y decidimos el alcance que tiene sentido para ti.",
      processStep3Title: 'Ejecutamos',
      processStep3Desc: "Ya sea apoyo continuo o un proyecto enfocado, trabajo junto a ti—no arriba de ti.",
      processStep4Title: 'Creces',
      processStep4Desc: "Con métricas más claras, más tiempo y mejores decisiones—finalmente puedes enfocarte en lo que importa.",
      
      // Final CTA
      ctaTitle: "Tu Próximo Movimiento No Debería Ser una Adivinanza",
      ctaSubtitle: "Construyamos la claridad que te ha faltado. Una conversación es todo lo que necesitas para empezar.",
      ctaButton: "Agenda Tu Llamada Gratis",
      ctaReassurance: "Sin pitch. Sin presión. Solo una conversación real.",
      
      // Dashboard
      totalClients: 'Clientes Activos',
      activeProjects: 'Proyectos Activos',
      monthlyRevenue: 'Ingresos (30d)',
      upcomingSessions: 'Sesiones Próximas',
      upcomingTasks: 'Tareas Próximas',
      recentProjects: 'Proyectos Recientes',
      welcomeBack: "¡Bienvenido de vuelta! Aquí está lo que está pasando.",
      
      // Actions
      add: 'Agregar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      view: 'Ver',
      learnMoreAction: 'Aprende Más',
      
      // Status
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
      completed: 'Completado',
      draft: 'Borrador',
      
      // Book Demo Page
      backToHome: 'Volver a la página de inicio',
      bookYourDemo: 'Reserva Tu Demostración',
      demoSubtitle: 'Agenda una demostración personalizada para ver cómo Veronika puede transformar tu flujo de trabajo.',
      whatToExpect: 'Qué Esperar',
      demoMinutes30: 'Sesión de 30 Minutos',
      demoMinutesDesc: 'Recorrido completo de todas las características',
      personalizedDemo: 'Demostración Personalizada',
      personalizedDemoDesc: 'Adaptada a las necesidades de tu negocio',
      qaSession: 'Sesión de Preguntas y Respuestas',
      qaSessionDesc: 'Obtén respuestas a todas tus preguntas',
      demoFeatures: 'Características de la Demostración',
      featureClientManagement: 'Gestión de Clientes y Proyectos',
      featureTaskTracking: 'Seguimiento de Tareas y Tableros Kanban',
      featureInvoicing: 'Procesamiento de Facturas y Pagos',
      featureAnalytics: 'Análisis e Informes',
      scheduleYourDemo: 'Agenda Tu Demostración',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      company: 'Empresa',
      preferredDate: 'Fecha Preferida',
      preferredTime: 'Hora Preferida',
      additionalMessage: 'Mensaje Adicional',
      bookMyDemo: 'Reserva Mi Demostración',
      businessNeeds: 'Cuéntanos sobre las necesidades de tu negocio...',
      missingInformation: 'Información Faltante',
      pleaseFilFill: 'Por favor completa todos los campos requeridos y selecciona una hora.',
      demoBookedTitle: '¡Demostración Reservada!',
      demoBookedSuccess: 'Tu demostración ha sido programada para {date} a las {time}. Te enviaremos un correo de confirmación con los detalles de la reunión.',
      demoBookedButton: 'Volver a la página de inicio',
      
      // Footer
      footerTagline: 'Estrategia, Alma y Estructura',
      footerCopyright: '© 2025 Veronika N. Dimitrova. Todos los derechos reservados.',
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
