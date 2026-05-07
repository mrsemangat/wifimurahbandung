'use client'

import { Wifi, MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

const coverageAreas = [
  'Bandung Kota',
  'Bandung Kabupaten',
  'Cimahi',
  'Sumedang',
  'Bandung Barat',
  'Garut',
]

const providerPartners = [
  'IndiHome',
  'Biznet',
  'MyRepublic',
  'First Media',
  'CBN',
  'MNC Play',
]

export default function Footer() {
  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent('Halo, saya ingin bertanya tentang layanan WiFi di Bandung.')
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <footer className="bg-green text-green-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Tentang Kami */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 rounded-lg p-1.5 overflow-hidden">
                <img src="/logo-wifi.png" alt="Wifi Murah Bandung" className="size-5 object-contain brightness-0 invert" />
              </div>
              <span className="font-bold text-lg text-white">
                Wifi Murah Bandung
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Layanan pemasangan WiFi terpercaya di Bandung. Kami membantu Anda
              mendapatkan koneksi internet terbaik dengan harga terjangkau dari
              berbagai provider terkemuka.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="size-4" />
              </a>
            </div>
          </div>

          {/* Area Coverage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Area Coverage</h3>
            <ul className="space-y-2">
              {coverageAreas.map((area) => (
                <li key={area}>
                  <Link
                    href="/coverage-area"
                    className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                  >
                    <MapPin className="size-3 shrink-0" />
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Provider Partner */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Provider Partner</h3>
            <ul className="space-y-2">
              {providerPartners.map((provider) => (
                <li key={provider}>
                  <span className="text-white/70 text-sm flex items-center gap-2">
                    <Wifi className="size-3 shrink-0" />
                    {provider}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-lg">Kontak</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  WhatsApp: 0812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="tel:081234567890"
                  className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="size-4 shrink-0" />
                  Telepon: 0812-3456-7890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wifimurahbandung.com"
                  className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="size-4 shrink-0" />
                  info@wifimurahbandung.com
                </a>
              </li>
              <li>
                <span className="text-white/70 text-sm flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5" />
                  Jl. Dago No. 123, Bandung, Jawa Barat 40135
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Wifi Murah Bandung. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
