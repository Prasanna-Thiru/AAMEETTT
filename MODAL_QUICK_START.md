# Promotional Modal - Quick Start Guide

## 🚀 Quick Start (2 Minutes)

The modal is already integrated on your homepage! It will appear automatically 3 seconds after the page loads.

### View it Live
1. Go to `/` (homepage)
2. Wait 3 seconds
3. Modal appears in the center of the screen
4. Test login/signup functionality

---

## 📋 Usage Examples

### Example 1: Already on Homepage ✅
**File**: `src/app/page.tsx`

```tsx
import PromotionalLoginModalWrapper from "@/frontend/components/modals/PromotionalLoginModalWrapper";

export default function HomePage() {
  return (
    <>
      {/* ... other sections ... */}
      <PromotionalLoginModalWrapper 
        showAfterDelay={3000}  // Shows after 3 seconds
        showOnce={true}        // Only once per session
      />
    </>
  );
}
```

---

### Example 2: Manual Control with Button

```tsx
"use client";

import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function MyPage() {
  const { isOpen, open, close } = usePromotionalModal();

  return (
    <>
      <button 
        onClick={open}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Login Modal
      </button>

      <PromotionalLoginModal 
        isOpen={isOpen} 
        onClose={close}
      />
    </>
  );
}
```

---

### Example 3: With Custom Styling

```tsx
"use client";

import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import EnhancedPromotionalModal from "@/frontend/components/modals/EnhancedPromotionalModal";

export default function CustomModal() {
  const { isOpen, open, close } = usePromotionalModal();

  return (
    <>
      <button onClick={open}>Sign Up Now</button>

      <EnhancedPromotionalModal
        isOpen={isOpen}
        onClose={close}
        heading="Unlock Your Academic Potential"
        subheading="Join our learning community today"
        imageUrl="/images/students-studying.jpg"  // Your image
        imageAlt="Students studying together"
        ctaText="Start Learning Now"
        guestText="Maybe later"
        primaryGradient="from-indigo-600 to-purple-600"  // Custom gradient
      />
    </>
  );
}
```

---

### Example 4: Trigger on Scroll

```tsx
"use client";

import { useEffect, useState } from "react";
import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function ScrollTrigger() {
  const { isOpen, open, close } = usePromotionalModal();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show modal when user scrolls 50% down the page
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && !hasShown) {
        open();
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown, open]);

  return <PromotionalLoginModal isOpen={isOpen} onClose={close} />;
}
```

---

### Example 5: Exit Intent (On Mouse Leave)

```tsx
"use client";

import { useEffect } from "react";
import { usePromotionalModal } from "@/frontend/hooks/usePromotionalModal";
import PromotionalLoginModal from "@/frontend/components/modals/PromotionalLoginModal";

export default function ExitIntent() {
  const { isOpen, open, close } = usePromotionalModal();

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Show modal when mouse leaves top of page
      if (e.clientY <= 0) {
        open();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [open]);

  return <PromotionalLoginModal isOpen={isOpen} onClose={close} />;
}
```

---

## 🎨 Customization Examples

### Change Colors (Primary Gradient)

```tsx
// Blue (default)
primaryGradient="from-blue-600 to-indigo-600"

// Purple
primaryGradient="from-purple-600 to-pink-600"

// Green (Education themed)
primaryGradient="from-green-600 to-teal-600"

// Red/Orange (Warm)
primaryGradient="from-red-600 to-orange-600"
```

### Change Text

```tsx
<EnhancedPromotionalModal
  isOpen={isOpen}
  onClose={close}
  heading="Start Your Learning Adventure"
  subheading="Premium education at your fingertips"
  ctaText="Join 10,000+ Students"
  guestText="Continue browsing"
/>
```

### Add Custom Image

```tsx
<EnhancedPromotionalModal
  isOpen={isOpen}
  onClose={close}
  imageUrl="/images/classroom.jpg"
  imageAlt="Modern classroom"
  heading="Experience Our Campus"
  subheading="World-class facilities, exceptional education"
/>
```

---

## 🔧 Configuration

### Change Auto-Show Timing

```tsx
// Show after 5 seconds
<PromotionalLoginModalWrapper showAfterDelay={5000} showOnce={true} />

// Show immediately
<PromotionalLoginModalWrapper showAfterDelay={0} showOnce={true} />

// Show after 10 seconds
<PromotionalLoginModalWrapper showAfterDelay={10000} showOnce={true} />
```

### Show Every Time (Not Just Once)

```tsx
// Show every visit
<PromotionalLoginModalWrapper showAfterDelay={3000} showOnce={false} />
```

---

## 📱 Mobile View

On mobile devices:
- Modal stacks vertically (image on top, form below)
- Touch-friendly button sizes
- Optimized font sizes
- Reduced padding for smaller screens
- Maintains professional appearance

Test on mobile:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device
4. Refresh page

---

## ✅ Testing Checklist

- [ ] Modal appears on homepage after 3 seconds
- [ ] Close button (X) works
- [ ] Overlay click closes modal
- [ ] Email input validation works
- [ ] Password toggle shows/hides password
- [ ] Login button submits form
- [ ] Signup toggle switches to signup mode
- [ ] "No thanks" button closes modal
- [ ] Animations are smooth (0.3s)
- [ ] Mobile layout is responsive
- [ ] Error messages display properly
- [ ] Success message appears on valid submission
- [ ] Loading spinner shows during submission
- [ ] Form is accessible (tab navigation)

---

## 🐛 Troubleshooting

**Modal doesn't appear?**
- Clear browser cache
- Check Network tab for API errors
- Verify `showAfterDelay` isn't very large (>10000)
- Check browser console for JavaScript errors

**Form won't submit?**
- Check API endpoints in `/api/auth/*`
- Verify email/password are filled
- Look for error messages in form
- Check Network tab for API responses

**Mobile layout broken?**
- Clear cache and refresh
- Check if responsive breakpoints align (lg:)
- Verify padding/margin isn't too large
- Test on actual mobile device

**Animations stuttering?**
- Close other tabs
- Disable browser extensions
- Try different browser
- Check GPU acceleration is enabled

---

## 📚 Component Files Reference

```
frontend/
├── components/
│   └── modals/
│       ├── PromotionalLoginModal.tsx        ← Main modal
│       ├── EnhancedPromotionalModal.tsx     ← With customization
│       └── PromotionalLoginModalWrapper.tsx ← Auto-show wrapper
└── hooks/
    └── usePromotionalModal.ts               ← State management hook

src/
└── app/
    └── page.tsx                              ← Integrated on homepage

PROMOTIONAL_MODAL_README.md                  ← Full documentation
```

---

## 🎯 Next Steps

1. **Test on homepage** - Load `/` and verify modal appears
2. **Customize for your brand** - Change colors, text, image
3. **A/B test timing** - Try different `showAfterDelay` values
4. **Monitor analytics** - Track modal opens and conversions
5. **Optimize copy** - Test different headings/CTAs
6. **Add to other pages** - Use on admissions, contact pages, etc.

---

## 💡 Pro Tips

✅ Use `showOnce={true}` to avoid annoying users
✅ Set `showAfterDelay={3000}` for optimal engagement
✅ Include a good hero image for better conversions
✅ Keep copy short and action-focused
✅ Test on mobile first
✅ Monitor bounce rate after modal changes

---

**Ready to go live?** Your modal is production-ready! 🚀
