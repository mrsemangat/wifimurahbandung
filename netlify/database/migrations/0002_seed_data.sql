-- Seed admin user (password should be hashed in production)
INSERT INTO users (id, email, name, password, role, "createdAt")
VALUES ('clx_admin_001', 'admin@wifimurahbandung.web.id', 'Admin', 'admin123', 'admin', NOW())
ON CONFLICT (email) DO NOTHING;

-- Seed providers
INSERT INTO providers (id, name, slug, description, website, "order", "isActive") VALUES
  ('prov_001', 'IndiHome', 'indihome', 'Internet rumah & bisnis dari Telkom Indonesia', 'https://indihome.co.id', 1, TRUE),
  ('prov_002', 'Biznet', 'biznet', 'Internet fiber optik cepat & stabil', 'https://biznet.id', 2, TRUE),
  ('prov_003', 'MyRepublic', 'myrepublic', 'Internet gaming dengan latency rendah', 'https://myrepublic.net.id', 3, TRUE),
  ('prov_004', 'First Media', 'first-media', 'Internet & TV kabel fiber optik', 'https://firstmedia.com', 4, TRUE),
  ('prov_005', 'ICONNET', 'iconnet', 'Internet fiber dari Icon Plus', 'https://iconnet.id', 5, TRUE),
  ('prov_006', 'XL Satu', 'xl-satu', 'Internet rumah dari XL Axiata', 'https://xlsatu.co.id', 6, TRUE),
  ('prov_007', 'CBN', 'cbn', 'Internet fiber premium untuk bisnis', 'https://cbn.id', 7, TRUE),
  ('prov_008', 'MNC Play', 'mnc-play', 'Internet & TV fiber optik', 'https://mncplay.id', 8, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed trust indicators
INSERT INTO trust_indicators (id, icon, value, label, "order", "isActive") VALUES
  ('ti_001', 'Users', '1000+', 'Pelanggan Terbantu', 1, TRUE),
  ('ti_002', 'MapPin', 'Bandung Raya', 'Coverage Area', 2, TRUE),
  ('ti_003', 'Shield', 'Terpercaya', 'Provider Resmi', 3, TRUE),
  ('ti_004', 'Zap', 'Cepat', 'Respon Cepat', 4, TRUE),
  ('ti_005', 'MessageCircle', 'Gratis', 'Konsultasi', 5, TRUE)
ON CONFLICT DO NOTHING;

-- Seed keunggulan
INSERT INTO keunggulan (id, icon, title, description, "order", "isActive") VALUES
  ('kg_001', 'BadgeDollarSign', 'Harga Lebih Hemat', 'Dapatkan harga terbaik dari berbagai provider dalam satu tempat', 1, TRUE),
  ('kg_002', 'Layers', 'Banyak Pilihan Provider', 'Bandingkan paket dari 8+ provider internet terkemuka', 2, TRUE),
  ('kg_003', 'HandHelping', 'Dibantu Pilih Paket Terbaik', 'Tim kami bantu rekomendasikan paket sesuai kebutuhan Anda', 3, TRUE),
  ('kg_004', 'Search', 'Survey Area Gratis', 'Cek ketersediaan coverage di lokasi Anda tanpa biaya', 4, TRUE),
  ('kg_005', 'Rocket', 'Support Pemasangan Cepat', 'Proses instalasi cepat oleh teknisi berpengalaman', 5, TRUE),
  ('kg_006', 'Building', 'Rumah & Bisnis', 'Tersedia paket untuk kebutuhan rumah tangga hingga enterprise', 6, TRUE),
  ('kg_007', 'Wifi', 'Internet Stabil', 'Koneksi stabil 24/7 dengan uptime 99.9%', 7, TRUE),
  ('kg_008', 'Headphones', 'Tim Responsif', 'Customer service siap membantu kapan saja', 8, TRUE)
ON CONFLICT DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (id, name, location, review, rating, "order", "isActive") VALUES
  ('test_001', 'Rizky Pratama', 'Cimahi', 'Pemasangan cepat dan internet stabil. Saya bisa WFH tanpa kendala. Terima kasih Wifi Murah Bandung!', 5, 1, TRUE),
  ('test_002', 'Siti Nurhaliza', 'Bandung Kota', 'Awalnya bingung pilih provider, tapi tim sangat membantu merekomendasikan paket yang sesuai budget.', 5, 2, TRUE),
  ('test_003', 'Budi Santoso', 'Cibiru', 'Untuk gaming sangat lancar, ping rendah. Cocok buat yang suka main game online.', 5, 3, TRUE),
  ('test_004', 'Dewi Lestari', 'Lembang', 'Koneksi untuk kosan saya sekarang stabil. Harga juga terjangkau untuk mahasiswa.', 4, 4, TRUE),
  ('test_005', 'Ahmad Fauzi', 'Soreang', 'Saya pasang untuk usaha kafe, pelanggan puas dengan WiFi gratis yang cepat!', 5, 5, TRUE),
  ('test_006', 'Linda Wijaya', 'Pasteur', 'Proses dari konsultasi sampai pemasangan hanya 2 hari. Sangat profesional.', 5, 6, TRUE)
ON CONFLICT DO NOTHING;

-- Seed FAQs
INSERT INTO faqs (id, question, answer, "order", "isActive") VALUES
  ('faq_001', 'Provider apa saja yang tersedia?', 'Kami bekerja sama dengan berbagai provider terkemuka seperti IndiHome, Biznet, MyRepublic, First Media, ICONNET, XL Satu, CBN, dan MNC Play. Kami akan merekomendasikan provider terbaik sesuai lokasi dan kebutuhan Anda.', 1, TRUE),
  ('faq_002', 'Berapa biaya pemasangan?', 'Biaya pemasangan bervariasi tergantung provider dan paket yang dipilih. Ada promo bebas biaya pemasangan untuk paket tertentu. Hubungi kami untuk info promo terkini.', 2, TRUE),
  ('faq_003', 'Berapa lama proses instalasi?', 'Proses instalasi biasanya 1-3 hari kerja setelah survey lokasi. Untuk area tertentu bisa lebih cepat. Tim kami akan memberikan estimasi waktu yang lebih akurat.', 3, TRUE),
  ('faq_004', 'Apakah tersedia di area saya?', 'Kami melayani area Bandung Raya termasuk Bandung Kota, Cimahi, Kabupaten Bandung, dan sekitarnya. Silakan cek coverage melalui formulir kami atau hubungi via WhatsApp.', 4, TRUE),
  ('faq_005', 'Bisa untuk usaha/kantor?', 'Tentu! Kami menyediakan paket khusus untuk kebutuhan bisnis, kantor, kafe, dan enterprise dengan bandwidth lebih besar dan SLA yang terjamin.', 5, TRUE),
  ('faq_006', 'Apakah ada internet unlimited?', 'Ya, sebagian besar provider yang kami tawarkan memiliki paket unlimited tanpa FUP. Kami akan bantu pilihkan paket unlimited yang sesuai dengan budget Anda.', 6, TRUE)
ON CONFLICT DO NOTHING;

-- Seed article categories
INSERT INTO article_categories (id, name, slug, description, "order") VALUES
  ('cat_001', 'Tips & Trik', 'tips-trik', 'Tips dan trik seputar internet dan WiFi', 1),
  ('cat_002', 'Promo', 'promo', 'Promo dan diskon pemasangan internet', 2),
  ('cat_003', 'Review Provider', 'review-provider', 'Review dan perbandingan provider internet', 3),
  ('cat_004', 'Tutorial', 'tutorial', 'Tutorial setting dan konfigurasi internet', 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed settings
INSERT INTO settings (id, key, value, "group") VALUES
  ('set_001', 'wa_number', '6281234567890', 'contact'),
  ('set_002', 'wa_greeting', 'Halo, saya tertarik untuk pasang WiFi di Bandung. Bisa bantu info lebih lanjut?', 'contact'),
  ('set_003', 'site_name', 'Wifi Murah Bandung', 'general'),
  ('set_004', 'site_description', 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!', 'general'),
  ('set_005', 'hero_headline', 'Pasang WiFi Murah Bandung', 'hero'),
  ('set_006', 'hero_subheadline', 'Internet Cepat, Stabil & Harga Terjangkau', 'hero'),
  ('set_007', 'hero_description', 'Konsultasikan kebutuhan internet rumah, kantor, kosan, gaming hingga bisnis Anda. Kami bantu rekomendasikan provider terbaik sesuai lokasi & budget Anda.', 'hero'),
  ('set_008', 'countdown_end', '2026-12-31T23:59:59.000Z', 'promo'),
  ('set_009', 'countdown_text', 'Promo pemasangan bulan ini berakhir dalam:', 'promo'),
  ('set_010', 'countdown_enabled', 'true', 'promo'),
  ('set_011', 'popup_enabled', 'true', 'popup'),
  ('set_012', 'popup_delay', '10', 'popup'),
  ('set_013', 'notification_enabled', 'true', 'notification'),
  ('set_014', 'notification_interval', '15', 'notification')
ON CONFLICT (key) DO NOTHING;

-- Seed SEO settings
INSERT INTO seo_settings (id, page, "metaTitle", "metaDesc", "focusKeyword", "canonicalUrl") VALUES
  ('seo_001', 'home', 'Pasang WiFi Murah Bandung | Internet Cepat & Stabil', 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Provider terpercaya: IndiHome, Biznet, MyRepublic. Konsultasi gratis!', 'wifi murah bandung, pasang wifi bandung, internet rumah bandung', 'https://wifimurahbandung.web.id')
ON CONFLICT (page) DO NOTHING;

-- Seed popup
INSERT INTO popups (id, type, title, subtitle, "ctaText", "ctaUrl", "isActive", delay, "showOnce") VALUES
  ('popup_001', 'delay', '🎉 Promo Pemasangan WiFi!', 'Dapatkan GRATIS biaya pemasangan + modem untuk pelanggan baru. Terbatas!', 'Konsultasi Gratis', 'https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20promo%20pemasangan%20WiFi', TRUE, 10, TRUE)
ON CONFLICT DO NOTHING;

-- Seed notifications
INSERT INTO notifications (id, name, location, action, "timeAgo", "isActive") VALUES
  ('notif_001', 'Rizky', 'Cimahi', 'baru saja konsultasi pemasangan WiFi', '5 menit lalu', TRUE),
  ('notif_002', 'Sari', 'Bandung Kota', 'baru saja cek coverage area', '12 menit lalu', TRUE),
  ('notif_003', 'Budi', 'Cibiru', 'baru saja pasang internet rumah', '25 menit lalu', TRUE),
  ('notif_004', 'Dewi', 'Lembang', 'baru saja daftar paket gaming', '1 jam lalu', TRUE),
  ('notif_005', 'Ahmad', 'Soreang', 'baru saja konsultasi WiFi kantor', '2 jam lalu', TRUE),
  ('notif_006', 'Linda', 'Pasteur', 'baru saja pasang WiFi usaha', '3 jam lalu', TRUE)
ON CONFLICT DO NOTHING;
