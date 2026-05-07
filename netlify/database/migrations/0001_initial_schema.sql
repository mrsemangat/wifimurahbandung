-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Providers table
CREATE TABLE providers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  address TEXT,
  location TEXT,
  "needType" TEXT,
  budget TEXT,
  "providerId" TEXT REFERENCES providers(id),
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Article categories table
CREATE TABLE article_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Articles table
CREATE TABLE articles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  "featuredImage" TEXT,
  "categoryId" TEXT REFERENCES article_categories(id),
  "metaTitle" TEXT,
  "metaDesc" TEXT,
  "focusKeyword" TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  views INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Trust indicators table
CREATE TABLE trust_indicators (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Keunggulan table
CREATE TABLE keunggulan (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Testimonials table
CREATE TABLE testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  review TEXT NOT NULL,
  photo TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- FAQs table
CREATE TABLE faqs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Settings table
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  "group" TEXT
);

-- SEO settings table
CREATE TABLE seo_settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT UNIQUE NOT NULL,
  "metaTitle" TEXT,
  "metaDesc" TEXT,
  "focusKeyword" TEXT,
  "ogImage" TEXT,
  "canonicalUrl" TEXT
);

-- Popups table
CREATE TABLE popups (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'delay',
  title TEXT NOT NULL,
  subtitle TEXT,
  "ctaText" TEXT,
  "ctaUrl" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  delay INTEGER NOT NULL DEFAULT 5,
  "scrollPos" INTEGER NOT NULL DEFAULT 50,
  "showOnce" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  action TEXT NOT NULL,
  "timeAgo" TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tracking scripts table
CREATE TABLE tracking_scripts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  script TEXT NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  position TEXT NOT NULL DEFAULT 'head'
);

-- Index for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads("createdAt");
CREATE INDEX idx_leads_provider ON leads("providerId");
CREATE INDEX idx_articles_published ON articles(published);
CREATE INDEX idx_articles_category ON articles("categoryId");
CREATE INDEX idx_settings_key ON settings(key);
CREATE INDEX idx_settings_group ON settings("group");
