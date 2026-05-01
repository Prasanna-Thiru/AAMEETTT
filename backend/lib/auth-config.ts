/**
 * Authentication Configuration
 * Centralized configuration for cookies, tokens, and auth settings
 */

export const AUTH_CONFIG = {
  // Token expiration
  TOKEN_EXPIRY: "7d",
  
  // Cookie settings
  COOKIES: {
    AUTH_TOKEN: {
      name: "auth_token",
      config: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      },
    },
    ADMIN_TOKEN: {
      name: "admin_token",
      config: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      },
    },
    NEWSLETTER_PROMPT: {
      name: "newsletter_prompt",
      config: {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      },
    },
    GOOGLE_OAUTH_STATE: {
      name: "google_oauth_state",
      config: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 60 * 10, // 10 minutes
        path: "/",
      },
    },
  },

  // Password requirements
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: false,
    REQUIRE_NUMBERS: false,
    REQUIRE_SPECIAL: false,
  },

  // Email validation
  EMAIL: {
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Database
  DATABASE: {
    CONNECTION_TIMEOUT: 5000,
    SOCKET_TIMEOUT: 45000,
    MAX_POOL_SIZE: 10,
  },

  // Rate limiting
  RATE_LIMIT: {
    LOGIN_ATTEMPTS: 5,
    LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    PASSWORD_RESET_ATTEMPTS: 3,
    PASSWORD_RESET_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  },

  // Token expiration
  TOKEN_EXPIRY_MS: 7 * 24 * 60 * 60 * 1000, // 7 days

  // Password reset
  PASSWORD_RESET: {
    TOKEN_EXPIRY_MS: 60 * 60 * 1000, // 1 hour
  },
};

export default AUTH_CONFIG;
