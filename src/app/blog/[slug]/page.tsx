'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import {
  Calendar,
  Eye,
  ChevronRight,
  Share2,
  MessageCircle,
  Phone,
  ArrowRight,
  BookOpen,
  Loader2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

interface ArticleCategory {
  id: string
  name: string
  slug: string
}

interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featuredImage: string | null
  metaTitle: string | null
  metaDesc: string | null
  focusKeyword: string | null
  views: number
  createdAt: string
  updatedAt: string
  category: ArticleCategory | null
}

interface RelatedArticle {
  id: string
  title: string
  slug: string
  excerpt: string | null
  createdAt: string
  category: ArticleCategory | null
}

function TableOfContents({ content }: { content: string }) {
  const headings = useMemo(() => {
    const regex = /^(#{2,3})\s+(.+)$/gm
    const result: { level: number; text: string; id: string }[] = []
    let match
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      result.push({ level, text, id })
    }
    return result
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav className="space-y-1">
      <h4 className="font-semibold text-sm mb-3">Daftar Isi</h4>
      {headings.map(h => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={`block text-sm text-muted-foreground hover:text-primary transition-colors py-1 ${
            h.level === 3 ? 'pl-4' : ''
          }`}
          onClick={e => {
            e.preventDefault()
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  )
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : ''
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green hover:bg-green/90 text-green-foreground',
    },
    {
      name: 'Facebook',
      icon: () => (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      name: 'Telegram',
      icon: () => (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
    },
    {
      name: 'X / Twitter',
      icon: () => (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-neutral-800 hover:bg-neutral-900 text-white',
    },
  ]

  return (
    <div className="flex items-center gap-2">
      <Share2 className="size-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Bagikan:</span>
      {shareLinks.map(link => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${link.color}`}
          aria-label={`Bagikan ke ${link.name}`}
        >
          <link.icon />
          <span className="ml-1 hidden sm:inline">{link.name}</span>
        </a>
      ))}
    </div>
  )
}

function MiniLeadForm() {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !whatsapp) return
    setSubmitting(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, source: 'blog_detail' }),
      })
      setSubmitted(true)
    } catch {
      // silent fail
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
        <div className="text-2xl mb-2">✅</div>
        <p className="font-semibold mb-1">Terima Kasih!</p>
        <p className="text-sm text-muted-foreground">Tim kami akan segera menghubungi Anda.</p>
      </div>
    )
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-1">Butuh Bantuan?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Konsultasikan kebutuhan internet Anda secara gratis.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Nama Anda"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Nomor WhatsApp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin mr-2" />
              Mengirim...
            </>
          ) : (
            'Konsultasi Gratis'
          )}
        </Button>
      </form>
    </div>
  )
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const fetchArticle = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/articles/${slug}`)
        if (res.ok) {
          const json = await res.json()
          setArticle(json.data)
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  useEffect(() => {
    if (!article?.category?.slug) return
    const fetchRelated = async () => {
      try {
        const res = await fetch(`/api/articles?limit=4&category=${article.category!.slug}`)
        if (res.ok) {
          const json = await res.json()
          setRelatedArticles(
            json.data.filter((a: RelatedArticle) => a.id !== article.id).slice(0, 3)
          )
        }
      } catch {
        // silent fail
      }
    }
    fetchRelated()
  }, [article])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const waNumber = '6281234567890'
  const waMessage = encodeURIComponent('Halo, saya ingin konsultasi pemasangan WiFi di Bandung.')
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`

  // JSON-LD structured data
  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt || article.metaDesc || '',
        datePublished: article.createdAt,
        dateModified: article.updatedAt,
        author: {
          '@type': 'Organization',
          name: 'Wifi Murah Bandung',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Wifi Murah Bandung',
        },
      }
    : null

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="size-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">
              Artikel yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Button asChild>
              <Link href="/blog">Kembali ke Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* JSON-LD */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Breadcrumb */}
        <section className="pt-24 pb-4 border-b bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-xs truncate">
                    {article.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
                  {article.category && (
                    <Badge className="bg-primary text-primary-foreground">
                      {article.category.name}
                    </Badge>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {article.views} views
                  </span>
                </div>

                {/* Featured Image */}
                {article.featuredImage && (
                  <div className="aspect-video rounded-xl overflow-hidden mb-8">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-img:rounded-lg">
                  <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* Share Buttons */}
                <div className="mt-10 pt-6 border-t">
                  <ShareButtons title={article.title} slug={article.slug} />
                </div>

                {/* Mini Lead Form */}
                <div className="mt-8">
                  <MiniLeadForm />
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Artikel Terkait</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedArticles.map(ra => (
                        <Link key={ra.id} href={`/blog/${ra.slug}`} className="group block">
                          <div className="bg-card border rounded-xl p-4 hover:shadow-md transition-all h-full">
                            {ra.category && (
                              <Badge variant="secondary" className="mb-2 text-xs">
                                {ra.category.name}
                              </Badge>
                            )}
                            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {ra.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {ra.excerpt || 'Baca selengkapnya...'}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Table of Contents */}
                  <div className="bg-card border rounded-xl p-5">
                    <TableOfContents content={article.content} />
                  </div>

                  {/* CTA Sidebar */}
                  <div className="bg-primary rounded-xl p-5 text-primary-foreground space-y-4">
                    <h3 className="font-bold text-lg">Butuh WiFi?</h3>
                    <p className="text-white/80 text-sm">
                      Konsultasikan kebutuhan internet Anda dengan tim kami secara gratis.
                    </p>
                    <div className="space-y-2">
                      <Button asChild className="w-full bg-white text-primary hover:bg-white/90">
                        <a href={waLink} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="size-4 mr-2" />
                          Konsultasi WiFi
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-white/30 text-white hover:bg-white/10"
                      >
                        <Link href="/#lead-form">
                          <Phone className="size-4 mr-2" />
                          Pasang Sekarang
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
