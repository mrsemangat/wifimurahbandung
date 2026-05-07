'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wifi, Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Beranda', href: '#hero', isPage: false },
  { label: 'Keunggulan', href: '#keunggulan', isPage: false },
  { label: 'Provider', href: '#provider', isPage: false },
  { label: 'FAQ', href: '#faq', isPage: false },
  { label: 'Blog', href: '/blog', isPage: true },
  { label: 'Kontak', href: '/kontak', isPage: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string, isPage: boolean) => {
    setOpen(false)
    if (isPage) return // Let Link handle navigation
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent('Halo, saya ingin konsultasi pemasangan WiFi di Bandung.')
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        (!isHome || scrolled)
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-primary rounded-lg p-1.5 group-hover:bg-primary/90 transition-colors overflow-hidden">
              <img src="/logo-wifi.png" alt="Wifi Murah Bandung" className="size-5 object-contain" />
            </div>
            <span className={`font-bold text-lg transition-colors ${(!isHome || scrolled) ? 'text-foreground' : 'text-white'}`}>
              Wifi Murah <span className="text-orange">Bandung</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                    isHome ? (scrolled ? 'text-foreground' : 'text-white/90 hover:text-white') : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (!isHome) return
                    e.preventDefault()
                    handleNavClick(link.href, false)
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                    isHome ? (scrolled ? 'text-foreground' : 'text-white/90 hover:text-white') : 'text-foreground'
                  }`}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-green hover:bg-green/90 text-green-foreground"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Konsultasi Gratis
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={(!isHome || scrolled) ? 'text-foreground' : 'text-white'}>
                  <Menu className="size-6" />
                  <span className="sr-only">Buka menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2 px-2">
                  <div className="bg-primary rounded-lg p-1.5 overflow-hidden">
                    <img src="/logo-wifi.png" alt="Wifi Murah Bandung" className="size-5 object-contain" />
                  </div>
                  <span className="font-bold text-lg">
                    Wifi Murah <span className="text-orange">Bandung</span>
                  </span>
                </SheetTitle>
                <div className="flex flex-col gap-1 mt-6 px-2">
                  {navLinks.map((link) => (
                    link.isPage ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          if (!isHome) return
                          e.preventDefault()
                          handleNavClick(link.href, false)
                        }}
                        className="px-3 py-3 rounded-md text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    )
                  ))}
                  <div className="pt-4 mt-4 border-t">
                    <Button asChild className="w-full bg-green hover:bg-green/90 text-green-foreground">
                      <a href={waLink} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4" />
                        Konsultasi Gratis
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
