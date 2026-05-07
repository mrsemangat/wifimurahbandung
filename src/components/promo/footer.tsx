'use client'

import { Wifi, MessageCircle } from 'lucide-react'
import { getWaLink } from './wa-config'

export default function PromoFooter() {
  const waLink = getWaLink('Halo, saya ingin bertanya tentang pemasangan WiFi.')

  return (
    <footer className="bg-foreground py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wifi className="size-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">
              Wifi Murah Bandung
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-xs sm:text-sm text-center">
            &copy; {new Date().getFullYear()} Wifi Murah Bandung. All rights reserved.
          </p>

          {/* WhatsApp link */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:text-[#20BD5A] text-sm font-medium transition-colors"
          >
            <MessageCircle className="size-4" />
            Chat WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
