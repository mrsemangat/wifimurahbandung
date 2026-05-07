'use client'

import PromoNavbar from '@/components/promo/navbar'
import PromoCountdownTimer from '@/components/promo/countdown-timer'
import PromoHeroSection from '@/components/promo/hero-section'
import PromoProblemSection from '@/components/promo/problem-section'
import PromoProviderSection from '@/components/promo/provider-section'
import PromoKeunggulanSection from '@/components/promo/keunggulan-section'
import PromoTestimonialSection from '@/components/promo/testimonial-section'
import PromoFaqSection from '@/components/promo/faq-section'
import PromoCtaSection from '@/components/promo/cta-section'
import PromoFooter from '@/components/promo/footer'
import PromoFloatingWa from '@/components/promo/floating-wa'
import PromoStickyCtaMobile from '@/components/promo/sticky-cta-mobile'
import PromoNotificationPopup from '@/components/promo/notification-popup'
import PromoPopupLead from '@/components/promo/popup-lead'

export default function PromoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoNavbar />
      <PromoCountdownTimer />
      <main className="flex-1">
        <PromoHeroSection />
        <PromoProblemSection />
        <PromoProviderSection />
        <PromoKeunggulanSection />
        <PromoTestimonialSection />
        <PromoFaqSection />
        <PromoCtaSection />
      </main>
      <PromoFooter />

      {/* Floating & Overlay Elements */}
      <PromoFloatingWa />
      <PromoStickyCtaMobile />
      <PromoNotificationPopup />
      <PromoPopupLead />
    </div>
  )
}
