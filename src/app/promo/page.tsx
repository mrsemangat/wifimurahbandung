'use client'

import PromoNavbar from '@/components/promo/navbar'
import PromoHeroSection from '@/components/promo/hero-section'
import PromoProviderSection from '@/components/promo/provider-section'
import PromoKeunggulanSection from '@/components/promo/keunggulan-section'
import PromoTestimonialSection from '@/components/promo/testimonial-section'
import PromoFaqSection from '@/components/promo/faq-section'
import PromoCtaSection from '@/components/promo/cta-section'
import PromoFooter from '@/components/promo/footer'
import PromoFloatingWa from '@/components/promo/floating-wa'
import PromoStickyCtaMobile from '@/components/promo/sticky-cta-mobile'

export default function PromoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoNavbar />
      <main className="flex-1">
        <PromoHeroSection />
        <PromoProviderSection />
        <PromoKeunggulanSection />
        <PromoTestimonialSection />
        <PromoFaqSection />
        <PromoCtaSection />
      </main>
      <PromoFooter />

      {/* Floating & Sticky Elements */}
      <PromoFloatingWa />
      <PromoStickyCtaMobile />
    </div>
  )
}
