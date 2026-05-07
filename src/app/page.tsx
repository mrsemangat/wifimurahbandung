'use client'

import Navbar from '@/components/landing/navbar'
import HeroSection from '@/components/landing/hero-section'
import CountdownTimer from '@/components/landing/countdown-timer'
import TrustIndicators from '@/components/landing/trust-indicators'
import ProblemSolutionSection from '@/components/landing/problem-solution-section'
import KeunggulanSection from '@/components/landing/keunggulan-section'
import ProviderSection from '@/components/landing/provider-section'
import LeadFormSection from '@/components/landing/lead-form-section'
import TestimonialSection from '@/components/landing/testimonial-section'
import CtaSection from '@/components/landing/cta-section'
import FaqSection from '@/components/landing/faq-section'
import BlogSection from '@/components/landing/blog-section'
import Footer from '@/components/landing/footer'
import FloatingWhatsApp from '@/components/landing/floating-whatsapp'
import PopupLead from '@/components/landing/popup-lead'
import NotificationPopup from '@/components/landing/notification-popup'
import StickyCtaMobile from '@/components/landing/sticky-cta-mobile'
import SchemaMarkup from '@/components/landing/schema-markup'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CountdownTimer />
        <TrustIndicators />
        <ProblemSolutionSection />
        <KeunggulanSection />
        <ProviderSection />
        <LeadFormSection />
        <TestimonialSection />
        <CtaSection />
        <FaqSection />
        <BlogSection />
      </main>
      <Footer />

      {/* Floating / Overlay Elements */}
      <FloatingWhatsApp />
      <PopupLead />
      <NotificationPopup />
      <StickyCtaMobile />
    </div>
  )
}
