'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useEmblaCarousel from 'embla-carousel-react'

interface Testimonial {
  id: string
  name: string
  location: string | null
  review: string
  rating: number
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rizky Pratama',
    location: 'Cimahi',
    review:
      'Pemasangan cepat dan internet sangat stabil. Harga juga lebih murah dibanding pasang langsung. Recommended!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    location: 'Bandung Wetan',
    review:
      'Saya pakai untuk WFH dan sangat puas. Tidak pernah down dan speed sesuai yang dijanjikan.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Budi Santoso',
    location: 'Coblong',
    review:
      'Konsultasinya gratis dan sangat membantu. Timnya jujur soal coverage di daerah saya.',
    rating: 4,
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    location: 'Sukajadi',
    review:
      'Anak-anak bisa online school lancar, suami bisa WFH. Satu router untuk semua. Mantap!',
    rating: 5,
  },
  {
    id: '5',
    name: 'Andi Firmansyah',
    location: 'Cidadap',
    review:
      'Untuk gaming ping-nya stabil, tidak lag. Pelayanan pasca-pemasangan juga responsif.',
    rating: 5,
  },
]

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
        }
      })
      .catch(() => {})
  }, [])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  // Auto play
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Apa Kata <span className="text-primary">Pelanggan Kami</span>?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Dengarkan pengalaman pelanggan yang sudah merasakan layanan kami.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < testimonial.rating
                              ? 'fill-orange text-orange'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed flex-1 mb-4">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {testimonial.location || 'Bandung'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 hidden sm:flex rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 hidden sm:flex rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight className="size-4" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === selectedIndex
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
