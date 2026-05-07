'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ArticleCategory {
  id: string
  name: string
  slug: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: ArticleCategory | null
  createdAt: string
}

const categoryColors: Record<string, string> = {
  perbandingan: 'bg-primary/10 text-primary',
  tips: 'bg-green/10 text-green',
  tutorial: 'bg-orange/10 text-orange',
}

export default function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/articles?limit=3')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data)
        }
      })
      .catch(() => {})
  }, [])

  if (articles.length === 0) {
    return (
      <section id="blog" className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Artikel <span className="text-primary">Terbaru</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Tips, panduan, dan informasi seputar internet dan WiFi di Bandung.
            </p>
          </motion.div>
          <p className="text-center text-muted-foreground">Artikel segera hadir.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Artikel <span className="text-primary">Terbaru</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tips, panduan, dan informasi seputar internet dan WiFi di Bandung.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Colored header bar */}
              <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary/30">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {article.category && (
                    <Badge
                      variant="secondary"
                      className={
                        categoryColors[article.category.slug] || 'bg-muted text-muted-foreground'
                      }
                    >
                      {article.category.name}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(article.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt || ''}
                </p>
                <Button variant="ghost" size="sm" className="text-primary p-0 h-auto hover:bg-transparent">
                  Baca Selengkapnya
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg">
            Lihat Semua Artikel
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
