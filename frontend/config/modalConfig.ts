/**
 * Promotional Modal Configuration
 * 
 * Centralized configuration for all promotional modal settings
 * across the application. Modify these settings to customize
 * modal behavior, styling, and content globally.
 */

export const PROMOTIONAL_MODAL_CONFIG = {
  // Auto-show settings
  autoShow: {
    enabled: true,
    delayMs: 3000,        // Show after 3 seconds
    showOnce: true,       // Only once per session
    storageKey: "mnrs_modal_shown", // Session storage key
  },

  // Modal layout settings
  layout: {
    maxWidth: "max-w-4xl", // Container max-width
    minHeight: {
      mobile: "min-h-[500px]",
      desktop: "min-h-[550px]",
    },
    borderRadius: "rounded-3xl",
    shadow: "shadow-2xl",
  },

  // Content settings
  content: {
    heading: {
      login: "Welcome Back",
    },
    subheading: {
      login: "Access your academic dashboard with school-issued credentials",
    },
    buttons: {
      cta: {
        login: "Sign In to Dashboard",
      },
      secondary: "No thanks, browse as guest",
      loadingText: "Processing...",
    },
    toggleText: {
      toLogin: "Sign In",
    },
  },

  // Styling settings
  styling: {
    // Primary gradient for buttons and accents
    primaryGradient: "from-blue-600 to-indigo-600",
    
    // Overlay opacity
    overlayOpacity: "bg-black/50",
    
    // Form input styling
    inputClass: "focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    
    // Button styling
    buttonClass: "duration-200 transition-all",
  },

  // Animation settings
  animations: {
    duration: 0.3,  // 300ms
    easing: "easeOut",
    variants: {
      overlay: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      modal: {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
      },
    },
  },

  // Form settings
  form: {
    // Email input placeholder
    emailPlaceholder: "your@email.com",
    
    // Password input placeholder
    passwordPlaceholder: "••••••••",
    
    // Validation
    validation: {
      minPasswordLength: 6,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    // Error/Success messages
    messages: {
      errors: {
        invalidEmail: "Please enter a valid email address",
        passwordTooShort: "Password must be at least 6 characters",
        passwordMismatch: "Passwords do not match",
        generic: "An error occurred. Please try again.",
      },
      success: {
        login: "Login successful! Redirecting...",
      },
    },
  },

  // API endpoints
  api: {
    login: "/api/auth/student/login",
  },

  // Default role
  defaultRole: "student",

  // Redirect on success
  redirectOnSuccess: "/student/dashboard",

  // Accessibility
  accessibility: {
    closeButtonLabel: "Close modal",
    focusTrap: true,
    closeOnEscape: true,
  },

  // Image/Icon settings
  image: {
    // If using custom image, set this
    customImageUrl: null,
    customImageAlt: "Education",
    
    // Use default icon if no image provided
    useDefaultIcon: true,
  },

  // Mobile-specific settings
  mobile: {
    showImagePlaceholder: true,  // Show image on mobile
    paddingX: "p-4 sm:p-6",      // Horizontal padding
    paddingY: "p-6 sm:p-8",      // Vertical padding
    fontSize: {
      heading: "text-2xl sm:text-3xl",
      subheading: "text-sm sm:text-base",
      button: "text-sm sm:text-base",
    },
  },

  // Analytics (optional)
  analytics: {
    trackModals: false,
    trackSubmissions: false,
  },
};

/**
 * Per-page modal configuration
 * 
 * Override default settings for specific pages/routes
 */
export const PAGE_MODAL_CONFIG: Record<string, any> = {
  // Homepage
  "/": {
    autoShow: {
      enabled: true,
      delayMs: 3000,
      showOnce: true,
    },
  },

  // Admissions page
  "/admissions": {
    autoShow: {
      enabled: true,
      delayMs: 5000,
      showOnce: true,
    },
    content: {
      heading: "Begin Your Admissions Journey",
      subheading: "Quick registration to start your admission process",
    },
  },

  // Faculty page
  "/faculty": {
    autoShow: {
      enabled: false, // Don't show on faculty page
    },
  },
};

/**
 * Get modal configuration for current page
 * 
 * @param pathname - Current page pathname
 * @returns Merged configuration object
 */
export function getModalConfig(pathname: string) {
  const pageConfig = PAGE_MODAL_CONFIG[pathname] || {};
  return {
    ...PROMOTIONAL_MODAL_CONFIG,
    ...pageConfig,
  };
}

/**
 * Update modal configuration globally
 * 
 * @param updates - Partial configuration updates
 */
export function updateModalConfig(updates: Partial<typeof PROMOTIONAL_MODAL_CONFIG>) {
  Object.assign(PROMOTIONAL_MODAL_CONFIG, updates);
}

/**
 * Update page-specific configuration
 * 
 * @param pathname - Page pathname
 * @param updates - Partial configuration updates
 */
export function updatePageModalConfig(
  pathname: string,
  updates: Partial<typeof PROMOTIONAL_MODAL_CONFIG>
) {
  if (!PAGE_MODAL_CONFIG[pathname]) {
    PAGE_MODAL_CONFIG[pathname] = {};
  }
  Object.assign(PAGE_MODAL_CONFIG[pathname], updates);
}

/**
 * Export preset configurations for common use cases
 */
export const MODAL_PRESETS = {
  // High-engagement preset (shows frequently)
  highEngagement: {
    autoShow: {
      delayMs: 2000,
      showOnce: false,
    },
  },

  // Low-engagement preset (shows rarely)
  lowEngagement: {
    autoShow: {
      delayMs: 10000,
      showOnce: true,
    },
  },

  // Exit-intent preset (no auto-show)
  exitIntent: {
    autoShow: {
      enabled: false,
    },
  },

  // Scroll-trigger preset
  scrollTrigger: {
    autoShow: {
      enabled: false,
    },
  },

  // Aggressive marketing
  aggressive: {
    autoShow: {
      delayMs: 1000,
      showOnce: false,
    },
    content: {
      buttons: {
        cta: "Unlock Your Potential",
        secondary: "Maybe Later",
      },
    },
  },

  // Conservative (high respect for UX)
  conservative: {
    autoShow: {
      delayMs: 8000,
      showOnce: true,
    },
    content: {
      buttons: {
        secondary: "No thanks, I'm just browsing",
      },
    },
  },

  // Dark mode (if implementing dark mode support)
  darkMode: {
    styling: {
      primaryGradient: "from-dark-600 to-dark-800",
      overlayOpacity: "bg-black/70",
    },
  },
};

// Type exports for TypeScript
export type PromotionalModalConfig = typeof PROMOTIONAL_MODAL_CONFIG;
export type PageModalConfig = typeof PAGE_MODAL_CONFIG;
export type ModalPreset = keyof typeof MODAL_PRESETS;
