'use client'

import { useState, useEffect } from 'react'
import { Wifi, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { getWaLink } from './wa-config'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Provider', href: '#provider' },
  { label: 'FAQ', href: '#faq' },
]

export default function PromoNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Wifi className="size-5 text-white" />
            </div>
            <span
              className={`font-bold text-lg transition-colors ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              Wifi Murah Bandung
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-foreground hover:bg-muted'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="ml-3 bg-green hover:bg-green/90 text-white font-semibold"
            >
              <a
                href={getWaLink('Halo, saya ingin bertanya tentang pemasangan WiFi.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi Kami
              </a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`size-6 ${scrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`size-6 ${scrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className="block px-4 py-3 rounded-md text-foreground font-medium hover:bg-muted transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="w-full mt-2 bg-green hover:bg-green/90 text-white font-semibold h-12"
              >
                <a
                  href={getWaLink('Halo, saya ingin bertanya tentang pemasangan WiFi.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi Kami via WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
