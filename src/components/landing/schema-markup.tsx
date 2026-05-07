'use client'

import { useEffect, useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export default function SchemaMarkup() {
  const [faqs, setFaqs] = useState<FaqItem[]>([])

  useEffect(() => {
    fetch('/api/faqs')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFaqs(data.map((f: { question: string; answer: string }) => ({
            question: f.question,
            answer: f.answer,
          })))
        }
      })
      .catch(() => {})
  }, [])

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Wifi Murah Bandung',
    description: 'Layanan pemasangan WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!',
    url: 'https://wifimurahbandung.web.id',
    telephone: '+6281234567890',
    email: 'info@wifimurahbandung.web.id',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Dago No. 123',
      addressLocality: 'Bandung',
      addressRegion: 'Jawa Barat',
      postalCode: '40135',
      addressCountry: 'ID',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bandung',
    },
    priceRange: 'Rp 200.000 - Rp 1.500.000',
    openingHours: 'Mo-Su 08:00-21:00',
    sameAs: [],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paket Internet Bandung',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pemasangan WiFi Rumah',
            description: 'Internet fiber optik untuk rumah tangga di Bandung',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pemasangan WiFi Kantor',
            description: 'Internet bisnis dengan bandwidth besar dan SLA terjamin',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pemasangan WiFi Gaming',
            description: 'Internet gaming dengan latency rendah dan kecepatan tinggi',
          },
        },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wifi Murah Bandung',
    url: 'https://wifimurahbandung.web.id',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://wifimurahbandung.web.id/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  )
}
