"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trickleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigating = useRef(false);
  const prev = useRef(routeKey);
  const control = useRef({
    start: (_initialWidth: number) => {},
    finish: () => {},
    clearAll: () => {},
  });

  const clearHideTimer = () => {
    if (!hideTimer.current) return;
    clearTimeout(hideTimer.current);
    hideTimer.current = null;
  };

  const clearCompleteTimer = () => {
    if (!completeTimer.current) return;
    clearTimeout(completeTimer.current);
    completeTimer.current = null;
  };

  const clearTrickleTimer = () => {
    if (!trickleTimer.current) return;
    clearInterval(trickleTimer.current);
    trickleTimer.current = null;
  };

  const startTrickling = () => {
    if (trickleTimer.current) return;

    trickleTimer.current = setInterval(() => {
      setWidth((current) => {
        if (current >= 90) return current;

        const remaining = 92 - current;
        return current + Math.max(2, remaining * 0.14);
      });
    }, 300);
  };

  const start = (initialWidth = 20) => {
    clearHideTimer();
    clearCompleteTimer();
    navigating.current = true;
    setVisible(true);
    setWidth((current) => Math.max(current, initialWidth));
    startTrickling();
  };

  const finish = () => {
    clearCompleteTimer();
    clearTrickleTimer();
    navigating.current = false;
    setVisible(true);
    setWidth(100);

    hideTimer.current = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
  };

  const clearAll = () => {
    clearHideTimer();
    clearCompleteTimer();
    clearTrickleTimer();
  };

  control.current.start = start;
  control.current.finish = finish;
  control.current.clearAll = clearAll;

  useEffect(() => {
    if (routeKey === prev.current) return;
    prev.current = routeKey;

    if (navigating.current) {
      control.current.finish();
      return;
    }

    control.current.start(42);
    completeTimer.current = setTimeout(() => {
      control.current.finish();
    }, 120);
  }, [routeKey]);

  useEffect(() => {
    const currentRoute = () => `${window.location.pathname}${window.location.search}`;

    const isInternalRouteChange = (urlValue?: string | URL | null) => {
      if (!urlValue) return false;

      try {
        const nextUrl = new URL(urlValue.toString(), window.location.href);

        if (nextUrl.origin !== window.location.origin) return false;

        return `${nextUrl.pathname}${nextUrl.search}` !== currentRoute();
      } catch {
        return false;
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return;
      }

      let nextUrl: URL;

      try {
        nextUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (nextUrl.origin !== window.location.origin) return;
      if (`${nextUrl.pathname}${nextUrl.search}` === currentRoute()) return;

      control.current.start(28);
    };

    const handlePopState = () => {
      control.current.start(28);
    };

    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function pushState(data, unused, url) {
      if (isInternalRouteChange(url)) {
        control.current.start(28);
      }

      originalPushState(data, unused, url);
    };

    window.history.replaceState = function replaceState(data, unused, url) {
      if (isInternalRouteChange(url)) {
        control.current.start(28);
      }

      originalReplaceState(data, unused, url);
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      control.current.clearAll();
    };
  }, []);

  if (!visible && width === 0) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-[3px] pointer-events-none transition-all"
      style={{
        width: `${width}%`,
        transitionDuration: visible ? "300ms" : "200ms",
        transitionTimingFunction: width === 100 ? "ease-out" : "linear",
        background: "linear-gradient(90deg, #1565C0, #0EA5E9, #38BDF8)",
        boxShadow: "0 0 10px rgba(14,165,233,0.7), 0 0 4px rgba(56,189,248,0.5)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full blur-sm"
        style={{ background: "rgba(56,189,248,0.8)" }}
      />
    </div>
  );
}
