'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Search, Calendar, ArrowRight, BookOpen, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  featuredImage: string | null
  views: number
  createdAt: string
  category: ArticleCategory | null
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const defaultCategories = [
  { name: 'All', slug: '' },
  { name: 'Tips & Trik', slug: 'tips-trik' },
  { name: 'Promo', slug: 'promo' },
  { name: 'Review Provider', slug: 'review-provider' },
  { name: 'Tutorial', slug: 'tutorial' },
]

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState(defaultCategories)
  const [activeCategory, setActiveCategory] = useState('')
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const fetchArticles = useCallback(async (page = 1, category = activeCategory, append = false) => {
    if (page === 1) setLoading(true)
    else setLoadingMore(true)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
      })
      if (category) params.set('category', category)

      const res = await fetch(`/api/articles?${params}`)
      const json = await res.json()

      if (append) {
        setArticles(prev => [...prev, ...json.data])
      } else {
        setArticles(json.data)
      }
      setPagination(json.pagination)
    } catch {
      // silent fail
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [activeCategory])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/articles?limit=1000')
      const json = await res.json()
      const cats = new Map<string, { name: string; slug: string }>()
      json.data?.forEach((a: Article) => {
        if (a.category && !cats.has(a.category.slug)) {
          cats.set(a.category.slug, a.category)
        }
      })
      if (cats.size > 0) {
        setCategories([
          { name: 'Semua', slug: '' },
          ...Array.from(cats.values()),
        ])
      }
    } catch {
      // silent fail
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchArticles(1, activeCategory, false)
  }, [activeCategory, fetchArticles])

  const filteredArticles = search
    ? articles.filter(
        a =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt?.toLowerCase().includes(search.toLowerCase())
      )
    : articles

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 pt-28 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
                <BookOpen className="size-3.5 mr-1" />
                Blog & Artikel
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Blog & Artikel
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Tips, promo, dan informasi seputar internet di Bandung
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8 border-b bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Cari artikel..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum Ada Artikel</h3>
                <p className="text-muted-foreground">
                  {search
                    ? 'Tidak ditemukan artikel yang sesuai dengan pencarian Anda.'
                    : 'Artikel untuk kategori ini belum tersedia.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link href={`/blog/${article.slug}`} className="group block">
                        <div className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                          {/* Image placeholder */}
                          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                            {article.featuredImage ? (
                              <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <BookOpen className="size-10 text-primary/30" />
                            )}
                            {article.category && (
                              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                                {article.category.name}
                              </Badge>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {formatDate(article.createdAt)}
                              </span>
                              <span>{article.views} views</span>
                            </div>
                            <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h2>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                              {article.excerpt || 'Baca selengkapnya artikel ini...'}
                            </p>
                            <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Baca Selengkapnya
                              <ArrowRight className="size-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Load More */}
                {pagination && pagination.page < pagination.totalPages && !search && (
                  <div className="text-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => fetchArticles(pagination.page + 1, activeCategory, true)}
                      disabled={loadingMore}
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="size-4 animate-spin mr-2" />
                          Memuat...
                        </>
                      ) : (
                        'Muat Lebih Banyak'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
