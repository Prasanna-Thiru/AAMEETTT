"use client";

import { useEffect, useState } from "react";
import PromotionalLoginModal from "./PromotionalLoginModal";
import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";

interface PromotionalLoginModalWrapperProps {
  showAfterDelay?: number; // milliseconds before auto-showing
  showOnce?: boolean; // only show once per session
}

export default function PromotionalLoginModalWrapper({
  showAfterDelay = 3000,
  showOnce = true,
}: PromotionalLoginModalWrapperProps) {
  const { isOpen, open, close } = usePromotionalModal();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (showOnce && hasShown) return;

    const timer = setTimeout(() => {
      open();
      if (showOnce) setHasShown(true);
    }, showAfterDelay);

    return () => clearTimeout(timer);
  }, [showAfterDelay, showOnce, open, hasShown]);

  const handleSuccess = () => {
    // Navigate to dashboard or refresh
    window.location.href = "/student/dashboard";
  };

  return (
    <PromotionalLoginModal isOpen={isOpen} onClose={close} onSuccess={handleSuccess} />
  );
}
