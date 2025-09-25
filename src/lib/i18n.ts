import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Language resources
const resources = {
  en: {
    common: {
      // Navigation
      overview: 'Overview',
      clients: 'Clients',
      projects: 'Projects',
      expenses: 'Expenses',
      bookings: 'Bookings',
      settings: 'Settings',
      
      // Hero Section
      heroTitle: 'Luxury Executive Support & Wellness Studio',
      heroSubtitle: 'Premium business management solutions for discerning professionals',
      heroDescription: 'Transform your business operations with our elegant, intuitive platform designed for executive excellence.',
      bookDemo: 'Book Strategy Session',
      learnMore: 'Learn More',
      
      // Services
      servicesTitle: 'Premium Services',
      clientManagement: 'Client Management',
      clientManagementDesc: 'Sophisticated CRM with analytics and insights',
      projectTracking: 'Project Tracking',
      projectTrackingDesc: 'Elegant kanban boards and progress monitoring',
      expenseManagement: 'Expense Management',
      expenseManagementDesc: 'Streamlined financial tracking and reporting',
      
      // Dashboard
      totalClients: 'Total Clients',
      activeProjects: 'Active Projects',
      monthlyRevenue: 'Monthly Revenue',
      upcomingTasks: 'Upcoming Tasks',
      recentProjects: 'Recent Projects',
      
      // Actions
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      view: 'View',
      
      // Status
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      draft: 'Draft',
    }
  },
  'es-MX': {
    common: {
      // Navigation
      overview: 'Resumen',
      clients: 'Clientes',
      projects: 'Proyectos',
      expenses: 'Gastos',
      bookings: 'Citas',
      settings: 'Configuración',
      
      // Hero Section
      heroTitle: 'Estudio de Apoyo Ejecutivo y Bienestar de Lujo',
      heroSubtitle: 'Soluciones premium de gestión empresarial para profesionales exigentes',
      heroDescription: 'Transforma tus operaciones comerciales con nuestra plataforma elegante e intuitiva diseñada para la excelencia ejecutiva.',
      bookDemo: 'Reservar Sesión Estratégica',
      learnMore: 'Saber Más',
      
      // Services
      servicesTitle: 'Servicios Premium',
      clientManagement: 'Gestión de Clientes',
      clientManagementDesc: 'CRM sofisticado con análisis e insights',
      projectTracking: 'Seguimiento de Proyectos',
      projectTrackingDesc: 'Tableros kanban elegantes y monitoreo de progreso',
      expenseManagement: 'Gestión de Gastos',
      expenseManagementDesc: 'Seguimiento financiero y reportes optimizados',
      
      // Dashboard
      totalClients: 'Total de Clientes',
      activeProjects: 'Proyectos Activos',
      monthlyRevenue: 'Ingresos Mensuales',
      upcomingTasks: 'Tareas Próximas',
      recentProjects: 'Proyectos Recientes',
      
      // Actions
      add: 'Agregar',
      edit: 'Editar',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
      view: 'Ver',
      
      // Status
      active: 'Activo',
      inactive: 'Inactivo',
      pending: 'Pendiente',
      completed: 'Completado',
      draft: 'Borrador',
    }
  },
  bg: {
    common: {
      // Navigation
      overview: 'Преглед',
      clients: 'Клиенти',
      projects: 'Проекти',
      expenses: 'Разходи',
      bookings: 'Резервации',
      settings: 'Настройки',
      
      // Hero Section
      heroTitle: 'Луксозно студио за изпълнителна подкрепа и благополучие',
      heroSubtitle: 'Премиум решения за управление на бизнеса за взискателни професионалисти',
      heroDescription: 'Трансформирайте вашите бизнес операции с нашата елегантна, интуитивна платформа, проектирана за изпълнително превъзходство.',
      bookDemo: 'Резервирай стратегическа сесия',
      learnMore: 'Научи повече',
      
      // Services
      servicesTitle: 'Премиум услуги',
      clientManagement: 'Управление на клиенти',
      clientManagementDesc: 'Софистицирана CRM система с анализи и прозрения',
      projectTracking: 'Проследяване на проекти',
      projectTrackingDesc: 'Елегантни канбан дъски и мониторинг на прогреса',
      expenseManagement: 'Управление на разходи',
      expenseManagementDesc: 'Оптимизирано финансово проследяване и отчитане',
      
      // Dashboard
      totalClients: 'Общо клиенти',
      activeProjects: 'Активни проекти',
      monthlyRevenue: 'Месечни приходи',
      upcomingTasks: 'Предстойни задачи',
      recentProjects: 'Скорошни проекти',
      
      // Actions
      add: 'Добави',
      edit: 'Редактирай',
      delete: 'Изтрий',
      save: 'Запази',
      cancel: 'Отмени',
      view: 'Виж',
      
      // Status
      active: 'Активен',
      inactive: 'Неактивен',
      pending: 'В очакване',
      completed: 'Завършен',
      draft: 'Чернова',
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