/**
 * Error handling utilities
 * Standardized error responses and logging
 */

import { NextResponse } from "next/server";

export interface ErrorContext {
  endpoint?: string;
  userId?: string;
  email?: string;
  action?: string;
  [key: string]: any;
}

export function createErrorResponse(
  message: string,
  status: number = 500,
  details?: ErrorContext
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  );
}

export function logError(
  action: string,
  error: any,
  context?: ErrorContext
) {
  const errorData = {
    action,
    message: error instanceof Error ? error.message : String(error),
    code: (error as any)?.code,
    name: error instanceof Error ? error.name : "Unknown",
    timestamp: new Date().toISOString(),
    ...context,
  };

  console.error(`❌ [${action}]`, errorData);
  
  // In production, you might want to send this to a logging service
  // Example: logToSentry(errorData) or logToLogRocket(errorData)
}

export function createServerErrorResponse(
  message: string = "Server error",
  context?: ErrorContext
) {
  if (context) logError(context.action || "Unknown", message, context);
  
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status: 500 }
  );
}

/**
 * Wrapper for async route handlers with automatic error handling
 */
export function withErrorHandling(handler: any) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      logError("Route Handler", error);
      return createServerErrorResponse("Server error");
    }
  };
}
