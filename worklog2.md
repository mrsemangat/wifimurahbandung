
---
Task ID: 1
Agent: Main
Task: Fix admin sidebar scrolling - bottom menu items not visible

Work Log:
- Added min-h-0 class to the ScrollArea in admin layout to allow proper flex shrinking

Stage Summary:
- Fixed: Admin sidebar now scrolls properly when menu items overflow the viewport
- File modified: src/app/admin/layout.tsx

---
Task ID: 2
Agent: Main
Task: Move countdown timer from top of LP to CTA area, make evergreen with admin-configurable duration

Work Log:
- Removed PromoCountdownTimer from top of promo page
- Rewrote countdown-timer.tsx as evergreen countdown using sessionStorage
- Integrated countdown timer into CTA section as urgency element
- Added promo_countdown_duration setting to admin promo-settings page

Stage Summary:
- Countdown timer moved from top bar to inside CTA section
- Evergreen: uses sessionStorage, configurable duration from admin
- Files modified: countdown-timer.tsx, cta-section.tsx, promo/page.tsx, promo-settings/page.tsx
