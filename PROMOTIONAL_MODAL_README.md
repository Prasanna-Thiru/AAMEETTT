# Promotional Login Modal Component

A modern, professional promotional login/signup modal designed for the education website. Inspired by high-converting promotional popups with a two-column layout on desktop and responsive single-column on mobile.

## Features

✅ **Modern Design**
- Two-column layout (desktop): Educational imagery + Content
- Single-column layout (mobile): Stacked image and content
- Clean white background with soft shadows
- Professional rounded corners (rounded-3xl)

✅ **Smooth Animations**
- 0.3s ease-in-out fade and scale transitions
- Overlay fade animation
- Success/error message animations

✅ **Functionality**
- Login and Signup modes with toggle
- Email and password inputs with icons
- Password visibility toggle
- Form validation
- Error and success message handling
- Loading state management
- Accessibility best practices (ARIA labels)

✅ **Responsive Design**
- Fully responsive for mobile, tablet, and desktop
- Optimized touch targets on mobile
- Reduced padding and font sizes on smaller screens
- Adapts layout from 2-column (desktop) to 1-column (mobile)

✅ **State Management**
- Custom hook for easy state management
- Prevents body scroll when modal is open
- Session-based display control (show once per session)
- Auto-show capability with configurable delay

## Components

### 1. PromotionalLoginModal
Main modal component with all UI and functionality.

**Location**: `frontend/components/modals/PromotionalLoginModal.tsx`

**Props**:
```typescript
interface PromotionalLoginModalProps {
  isOpen: boolean;              // Controls modal visibility
  onClose: () => void;          // Callback when modal closes
  onSuccess?: () => void;       // Callback on successful login/signup
}
```

**Usage**:
```tsx
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";
import { useState } from "react";

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    window.location.href = "/student/dashboard";
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <PromotionalLoginModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
```

### 2. usePromotionalModal Hook
Custom React hook for managing modal state.

**Location**: `frontend/hooks/usePromotionalModal.ts`

**Usage**:
```tsx
import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function MyComponent() {
  const { isOpen, open, close, toggle } = usePromotionalModal();

  return (
    <>
      <button onClick={open}>Open Modal</button>
      <button onClick={toggle}>Toggle Modal</button>
      <PromotionalLoginModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

### 3. PromotionalLoginModalWrapper
Wrapper component for easy integration with auto-show capability.

**Location**: `frontend/components/modals/PromotionalLoginModalWrapper.tsx`

**Props**:
```typescript
interface PromotionalLoginModalWrapperProps {
  showAfterDelay?: number;  // milliseconds before auto-showing (default: 3000)
  showOnce?: boolean;       // only show once per session (default: true)
}
```

**Usage** (e.g., in `/src/app/page.tsx`):
```tsx
<PromotionalLoginModalWrapper 
  showAfterDelay={3000} 
  showOnce={true} 
/>
```

## Integration Examples

### Example 1: Add to Homepage (Already Integrated)
```tsx
// src/app/page.tsx
import PromotionalLoginModalWrapper from "@/frontend/components/modals/PromotionalLoginModalWrapper";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* ... other sections ... */}
      <PromotionalLoginModalWrapper showAfterDelay={3000} showOnce={true} />
    </>
  );
}
```

### Example 2: Manual Control with Button
```tsx
"use client";

import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function LandingPage() {
  const { isOpen, open, close } = usePromotionalModal();

  return (
    <>
      <button 
        onClick={open}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Sign In
      </button>
      <PromotionalLoginModal isOpen={isOpen} onClose={close} />
    </>
  );
}
```

### Example 3: Trigger on Scroll
```tsx
"use client";

import { useEffect } from "react";
import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function ScrollTriggerPage() {
  const { isOpen, open, close } = usePromotionalModal();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 500 && !hasTriggered) {
        open();
        setHasTriggered(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasTriggered, open]);

  return <PromotionalLoginModal isOpen={isOpen} onClose={close} />;
}
```

## Customization

### Change Primary Colors
Edit the Tailwind classes in `PromotionalLoginModal.tsx`:

```tsx
// Button gradient
bg-gradient-to-r from-blue-600 to-indigo-600

// Focus ring color
focus:ring-2 focus:ring-blue-500

// Success state
text-blue-700
```

### Modify Educational Image/Icon
The SVG educational icon is in the component. Replace with your own:

```tsx
// Left side (desktop)
<svg className="w-32 h-32 text-white drop-shadow-lg" viewBox="0 0 200 200" fill="none">
  {/* Replace SVG content here */}
</svg>

// Mobile preview
<svg className="w-20 h-20 text-white drop-shadow-lg" viewBox="0 0 200 200" fill="none">
  {/* Replace SVG content here */}
</svg>
```

### Change Auto-Show Behavior
```tsx
// Show after 5 seconds
<PromotionalLoginModalWrapper showAfterDelay={5000} showOnce={true} />

// Show immediately
<PromotionalLoginModalWrapper showAfterDelay={0} showOnce={true} />

// Show every visit
<PromotionalLoginModalWrapper showAfterDelay={3000} showOnce={false} />
```

### Adjust Modal Size
Edit the grid in `PromotionalLoginModal.tsx`:

```tsx
// For wider modal
<div className="w-full max-w-5xl bg-white rounded-3xl...">

// For narrower modal
<div className="w-full max-w-2xl bg-white rounded-3xl...">
```

## Styling Reference

### Key Tailwind Classes Used
- Modal container: `fixed inset-0 z-50 flex items-center justify-center`
- Overlay: `fixed inset-0 bg-black/50 z-40`
- Input fields: `focus:ring-2 focus:ring-blue-500 focus:border-transparent`
- Buttons: `duration-200 transition-all` (smooth transitions)
- Gradients: `bg-gradient-to-r from-blue-600 to-indigo-600`

## API Integration

The modal integrates with existing endpoints:

**For Login**:
```typescript
POST /api/auth/student/login
Body: { email: string, password: string }
```

**For Signup**:
```typescript
POST /api/auth/signup
Body: { 
  role: "student", 
  name: string, 
  email: string, 
  password: string 
}
```

## Accessibility Features

✅ **ARIA Labels**: Proper aria-label for close button
✅ **Keyboard Navigation**: Can close with Esc key, tab through form fields
✅ **Focus Management**: Proper focus handling in form
✅ **Semantic HTML**: Using proper form elements, labels, buttons
✅ **Color Contrast**: WCAG compliant color combinations
✅ **Screen Reader Support**: Descriptive text and labels

## Performance Optimization

✅ **Code Splitting**: Modal loaded on-demand
✅ **Animation Performance**: Uses CSS transitions (GPU accelerated)
✅ **Lazy Loading**: Auto-show delay prevents performance impact
✅ **Minimal Dependencies**: Uses framer-motion (already in project)
✅ **Optimized SVG**: Lightweight educational icon illustration

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

## Troubleshooting

**Modal not appearing?**
- Check if `isOpen` prop is `true`
- Verify z-index isn't being overridden by other elements
- Check browser console for errors

**Form not submitting?**
- Verify API endpoints exist and are correct
- Check network tab in DevTools for API calls
- Ensure email/password values are captured correctly

**Animation stuttering?**
- Check for heavy elements on page
- Verify framer-motion is properly installed
- Try disabling other animations temporarily

**Mobile layout issues?**
- Check responsive breakpoints (lg: for desktop)
- Verify padding/margin on smaller screens
- Test with actual mobile devices

## Files Modified/Created

- ✅ Created: `frontend/components/modals/PromotionalLoginModal.tsx`
- ✅ Created: `frontend/components/modals/PromotionalLoginModalWrapper.tsx`
- ✅ Created: `frontend/hooks/usePromotionalModal.ts`
- ✅ Modified: `src/app/page.tsx` (added import and component)

## Next Steps

1. **Test the modal** on the homepage
2. **Customize colors** to match your brand
3. **Replace the educational icon** with your own image/graphic
4. **Configure auto-show delay** based on analytics
5. **Monitor conversion** through analytics
6. **A/B test** different copy and timing

---

**Need help?** Check the existing components or create an issue in your development workflow.
