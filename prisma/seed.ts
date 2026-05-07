import { db } from '../src/lib/db';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const existingUser = await db.user.findFirst({ where: { email: 'admin@wifimurahbandung.web.id' } });
  if (!existingUser) {
    await db.user.create({
      data: {
        email: 'admin@wifimurahbandung.web.id',
        name: 'Admin',
        password: 'admin123',
        role: 'admin',
      },
    });
  }

  // Create providers
  const providers = [
    { name: 'IndiHome', slug: 'indihome', description: 'Internet rumah & bisnis dari Telkom Indonesia', website: 'https://indihome.co.id', order: 1 },
    { name: 'Biznet', slug: 'biznet', description: 'Internet fiber optik cepat & stabil', website: 'https://biznet.id', order: 2 },
    { name: 'MyRepublic', slug: 'myrepublic', description: 'Internet gaming dengan latency rendah', website: 'https://myrepublic.net.id', order: 3 },
    { name: 'First Media', slug: 'first-media', description: 'Internet & TV kabel fiber optik', website: 'https://firstmedia.com', order: 4 },
    { name: 'ICONNET', slug: 'iconnet', description: 'Internet fiber dari Icon Plus', website: 'https://iconnet.id', order: 5 },
    { name: 'XL Satu', slug: 'xl-satu', description: 'Internet rumah dari XL Axiata', website: 'https://xlsatu.co.id', order: 6 },
    { name: 'CBN', slug: 'cbn', description: 'Internet fiber premium untuk bisnis', website: 'https://cbn.id', order: 7 },
    { name: 'MNC Play', slug: 'mnc-play', description: 'Internet & TV fiber optik', website: 'https://mncplay.id', order: 8 },
  ];

  for (const provider of providers) {
    const exists = await db.provider.findFirst({ where: { slug: provider.slug } });
    if (!exists) {
      await db.provider.create({ data: provider });
    }
  }

  // Create trust indicators
  const trustIndicators = [
    { icon: 'Users', value: '1000+', label: 'Pelanggan Terbantu', order: 1 },
    { icon: 'MapPin', value: 'Bandung Raya', label: 'Coverage Area', order: 2 },
    { icon: 'Shield', value: 'Terpercaya', label: 'Provider Resmi', order: 3 },
    { icon: 'Zap', value: 'Cepat', label: 'Respon Cepat', order: 4 },
    { icon: 'MessageCircle', value: 'Gratis', label: 'Konsultasi', order: 5 },
  ];

  for (const ti of trustIndicators) {
    const exists = await db.trustIndicator.findFirst({ where: { label: ti.label } });
    if (!exists) {
      await db.trustIndicator.create({ data: ti });
    }
  }

  // Create keunggulan
  const keunggulan = [
    { icon: 'BadgeDollarSign', title: 'Harga Lebih Hemat', desc: 'Dapatkan harga terbaik dari berbagai provider dalam satu tempat', order: 1 },
    { icon: 'Layers', title: 'Banyak Pilihan Provider', desc: 'Bandingkan paket dari 8+ provider internet terkemuka', order: 2 },
    { icon: 'HandHelping', title: 'Dibantu Pilih Paket Terbaik', desc: 'Tim kami bantu rekomendasikan paket sesuai kebutuhan Anda', order: 3 },
    { icon: 'Search', title: 'Survey Area Gratis', desc: 'Cek ketersediaan coverage di lokasi Anda tanpa biaya', order: 4 },
    { icon: 'Rocket', title: 'Support Pemasangan Cepat', desc: 'Proses instalasi cepat oleh teknisi berpengalaman', order: 5 },
    { icon: 'Building', title: 'Rumah & Bisnis', desc: 'Tersedia paket untuk kebutuhan rumah tangga hingga enterprise', order: 6 },
    { icon: 'Wifi', title: 'Internet Stabil', desc: 'Koneksi stabil 24/7 dengan uptime 99.9%', order: 7 },
    { icon: 'Headphones', title: 'Tim Responsif', desc: 'Customer service siap membantu kapan saja', order: 8 },
  ];

  for (const k of keunggulan) {
    const exists = await db.keunggulan.findFirst({ where: { title: k.title } });
    if (!exists) {
      await db.keunggulan.create({ data: k });
    }
  }

  // Create testimonials
  const testimonials = [
    { name: 'Rizky Pratama', location: 'Cimahi', review: 'Pemasangan cepat dan internet stabil. Saya bisa WFH tanpa kendala. Terima kasih Wifi Murah Bandung!', rating: 5, order: 1 },
    { name: 'Siti Nurhaliza', location: 'Bandung Kota', review: 'Awalnya bingung pilih provider, tapi tim sangat membantu merekomendasikan paket yang sesuai budget.', rating: 5, order: 2 },
    { name: 'Budi Santoso', location: 'Cibiru', review: 'Untuk gaming sangat lancar, ping rendah. Cocok buat yang suka main game online.', rating: 5, order: 3 },
    { name: 'Dewi Lestari', location: 'Lembang', review: 'Koneksi untuk kosan saya sekarang stabil. Harga juga terjangkau untuk mahasiswa.', rating: 4, order: 4 },
    { name: 'Ahmad Fauzi', location: 'Soreang', review: 'Saya pasang untuk usaha kafe, pelanggan puas dengan WiFi gratis yang cepat!', rating: 5, order: 5 },
    { name: 'Linda Wijaya', location: 'Pasteur', review: 'Proses dari konsultasi sampai pemasangan hanya 2 hari. Sangat profesional.', rating: 5, order: 6 },
  ];

  for (const t of testimonials) {
    const exists = await db.testimonial.findFirst({ where: { name: t.name } });
    if (!exists) {
      await db.testimonial.create({ data: t });
    }
  }

  // Create FAQs
  const faqs = [
    { question: 'Provider apa saja yang tersedia?', answer: 'Kami bekerja sama dengan berbagai provider terkemuka seperti IndiHome, Biznet, MyRepublic, First Media, ICONNET, XL Satu, CBN, dan MNC Play. Kami akan merekomendasikan provider terbaik sesuai lokasi dan kebutuhan Anda.', order: 1 },
    { question: 'Berapa biaya pemasangan?', answer: 'Biaya pemasangan bervariasi tergantung provider dan paket yang dipilih. Ada promo bebas biaya pemasangan untuk paket tertentu. Hubungi kami untuk info promo terkini.', order: 2 },
    { question: 'Berapa lama proses instalasi?', answer: 'Proses instalasi biasanya 1-3 hari kerja setelah survey lokasi. Untuk area tertentu bisa lebih cepat. Tim kami akan memberikan estimasi waktu yang lebih akurat.', order: 3 },
    { question: 'Apakah tersedia di area saya?', answer: 'Kami melayani area Bandung Raya termasuk Bandung Kota, Cimahi, Kabupaten Bandung, dan sekitarnya. Silakan cek coverage melalui formulir kami atau hubungi via WhatsApp.', order: 4 },
    { question: 'Bisa untuk usaha/kantor?', answer: 'Tentu! Kami menyediakan paket khusus untuk kebutuhan bisnis, kantor, kafe, dan enterprise dengan bandwidth lebih besar dan SLA yang terjamin.', order: 5 },
    { question: 'Apakah ada internet unlimited?', answer: 'Ya, sebagian besar provider yang kami tawarkan memiliki paket unlimited tanpa FUP. Kami akan bantu pilihkan paket unlimited yang sesuai dengan budget Anda.', order: 6 },
  ];

  for (const f of faqs) {
    const exists = await db.faq.findFirst({ where: { question: f.question } });
    if (!exists) {
      await db.faq.create({ data: f });
    }
  }

  // Create article categories
  const categories = [
    { name: 'Tips & Trik', slug: 'tips-trik', description: 'Tips dan trik seputar internet dan WiFi', order: 1 },
    { name: 'Promo', slug: 'promo', description: 'Promo dan diskon pemasangan internet', order: 2 },
    { name: 'Review Provider', slug: 'review-provider', description: 'Review dan perbandingan provider internet', order: 3 },
    { name: 'Tutorial', slug: 'tutorial', description: 'Tutorial setting dan konfigurasi internet', order: 4 },
  ];

  for (const c of categories) {
    const exists = await db.articleCategory.findFirst({ where: { slug: c.slug } });
    if (!exists) {
      await db.articleCategory.create({ data: c });
    }
  }

  // Create sample articles
  const tipsCategory = await db.articleCategory.findFirst({ where: { slug: 'tips-trik' } });
  const promoCategory = await db.articleCategory.findFirst({ where: { slug: 'promo' } });
  const reviewCategory = await db.articleCategory.findFirst({ where: { slug: 'review-provider' } });

  if (tipsCategory) {
    const articles = [
      {
        title: '5 Tips Memilih Internet Rumah yang Tepat di Bandung',
        slug: 'tips-memilih-internet-rumah-bandung',
        content: 'Memilih internet rumah yang tepat bisa menjadi tantangan, terutama dengan banyaknya pilihan provider di Bandung. Berikut 5 tips yang bisa membantu Anda:\n\n## 1. Tentukan Kebutuhan Bandwidth\n\nPertama, tentukan berapa banyak pengguna dan aktivitas yang akan dilakukan. Untuk browsing dan media sosial, 10-20 Mbps sudah cukup. Untuk streaming 4K dan gaming, pilih 50 Mbps ke atas.\n\n## 2. Cek Coverage Area\n\nTidak semua provider tersedia di semua area. Cek terlebih dahulu coverage area provider di lokasi Anda.\n\n## 3. Bandingkan Harga\n\nJangan langsung ambil paket pertama. Bandingkan harga dari beberapa provider untuk mendapatkan penawaran terbaik.\n\n## 4. Perhatikan FUP\n\nFair Usage Policy bisa membatasi kecepatan internet setelah kuota tertentu. Pilih paket unlimited jika Anda pengguna berat.\n\n## 5. Baca Review\n\nCari tahu pengalaman pelanggan lain di area Anda sebelum memutuskan.',
        excerpt: 'Panduan lengkap memilih internet rumah yang tepat di Bandung. Tips cek coverage, bandwidth, hingga perbandingan harga provider.',
        metaTitle: '5 Tips Memilih Internet Rumah yang Tepat di Bandung | Wifi Murah Bandung',
        metaDesc: 'Panduan lengkap memilih internet rumah di Bandung. Tips cek coverage, bandwidth, FUP, dan perbandingan harga provider terbaik.',
        focusKeyword: 'internet rumah bandung',
        published: true,
        categoryId: tipsCategory.id,
      },
      {
        title: 'Cara Setting WiFi Router untuk Kecepatan Optimal',
        slug: 'cara-setting-wifi-router-optimal',
        content: 'Setting router WiFi yang tepat bisa meningkatkan kecepatan internet Anda secara signifikan. Berikut panduan lengkapnya:\n\n## Posisi Router yang Ideal\n\nLetakkan router di tengah rumah, di tempat tinggi, dan jauh dari dinding tebal atau perangkat elektronik lain.\n\n## Pilih Channel yang Tepat\n\nGunakan channel yang tidak ramai untuk mengurangi interferensi. Channel 1, 6, dan 11 adalah pilihan terbaik untuk 2.4GHz.\n\n## Update Firmware\n\nPastikan firmware router selalu terupdate untuk performa dan keamanan terbaik.\n\n## Gunakan Band 5GHz\n\nUntuk perangkat yang mendukung, gunakan band 5GHz untuk kecepatan lebih tinggi meskipun jangkauan lebih pendek.',
        excerpt: 'Panduan setting WiFi router untuk kecepatan optimal. Posisi router, channel, firmware, dan tips lainnya.',
        metaTitle: 'Cara Setting WiFi Router untuk Kecepatan Optimal | Wifi Murah Bandung',
        metaDesc: 'Tutorial setting WiFi router untuk kecepatan internet optimal. Panduan posisi router, channel, dan konfigurasi.',
        focusKeyword: 'setting wifi router',
        published: true,
        categoryId: tipsCategory.id,
      },
    ];

    for (const a of articles) {
      const exists = await db.article.findFirst({ where: { slug: a.slug } });
      if (!exists) {
        await db.article.create({ data: a });
      }
    }
  }

  if (promoCategory) {
    const articles = [
      {
        title: 'Promo Pemasangan WiFi Gratis Bandung 2024',
        slug: 'promo-pemasangan-wifi-gratis-bandung',
        content: 'Dapatkan promo pemasangan WiFi gratis di Bandung! Penawaran terbatas untuk pelanggan baru.\n\n## Promo Tersedia\n\n- **IndiHome**: Bebas biaya pemasangan + modem gratis\n- **Biznet**: Diskon 50% biaya instalasi\n- **MyRepublic**: Free installation + 1 bulan gratis\n\n## Syarat & Ketentuan\n\n- Berlaku untuk pelanggan baru\n- Area Bandung Raya\n- Promo terbatas selama persediaan masih ada\n\nSegera hubungi kami untuk mendapatkan promo ini!',
        excerpt: 'Promo pemasangan WiFi gratis di Bandung. Bebas biaya instalasi dari berbagai provider. Penawaran terbatas!',
        metaTitle: 'Promo Pemasangan WiFi Gratis Bandung 2024 | Wifi Murah Bandung',
        metaDesc: 'Dapatkan promo pemasangan WiFi gratis di Bandung. Bebas biaya instalasi dari IndiHome, Biznet, MyRepublic dan lainnya.',
        focusKeyword: 'promo wifi bandung',
        published: true,
        categoryId: promoCategory.id,
      },
    ];

    for (const a of articles) {
      const exists = await db.article.findFirst({ where: { slug: a.slug } });
      if (!exists) {
        await db.article.create({ data: a });
      }
    }
  }

  if (reviewCategory) {
    const articles = [
      {
        title: 'Perbandingan IndiHome vs Biznet vs MyRepublic di Bandung',
        slug: 'perbandingan-indihome-biznet-myrepublic-bandung',
        content: 'Bingung pilih provider internet di Bandung? Berikut perbandingan tiga provider populer: IndiHome, Biznet, dan MyRepublic.\n\n## IndiHome\n\n- **Kecepatan**: 10-300 Mbps\n- **Harga**: Mulai Rp 275.000/bulan\n- **Kelebihan**: Coverage luas, paket bundling\n- **Kekurangan**: Kadang ada FUP\n\n## Biznet\n\n- **Kecepatan**: 25-250 Mbps\n- **Harga**: Mulai Rp 299.000/bulan\n- **Kelebihan**: Unlimited, stabil\n- **Kekurangan**: Coverage belum seluas IndiHome\n\n## MyRepublic\n\n- **Kecepatan**: 50-250 Mbps\n- **Harga**: Mulai Rp 249.000/bulan\n- **Kelebihan**: Gaming friendly, latency rendah\n- **Kekurangan**: Area terbatas\n\n## Kesimpulan\n\nPilih IndiHome untuk coverage luas, Biznet untuk unlimited, dan MyRepublic untuk gaming.',
        excerpt: 'Perbandingan lengkap IndiHome, Biznet, dan MyRepublic di Bandung. Harga, kecepatan, kelebihan dan kekurangan.',
        metaTitle: 'IndiHome vs Biznet vs MyRepublic Bandung | Wifi Murah Bandung',
        metaDesc: 'Perbandingan IndiHome vs Biznet vs MyRepublic di Bandung. Review harga, kecepatan, kelebihan dan kekurangan masing-masing.',
        focusKeyword: 'provider internet bandung',
        published: true,
        categoryId: reviewCategory.id,
      },
    ];

    for (const a of articles) {
      const exists = await db.article.findFirst({ where: { slug: a.slug } });
      if (!exists) {
        await db.article.create({ data: a });
      }
    }
  }

  // Create settings
  const settings = [
    { key: 'wa_number', value: '6281234567890', group: 'contact' },
    { key: 'wa_greeting', value: 'Halo, saya tertarik untuk pasang WiFi di Bandung. Bisa bantu info lebih lanjut?', group: 'contact' },
    { key: 'site_name', value: 'Wifi Murah Bandung', group: 'general' },
    { key: 'site_description', value: 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!', group: 'general' },
    { key: 'hero_headline', value: 'Pasang WiFi Murah Bandung', group: 'hero' },
    { key: 'hero_subheadline', value: 'Internet Cepat, Stabil & Harga Terjangkau', group: 'hero' },
    { key: 'hero_description', value: 'Konsultasikan kebutuhan internet rumah, kantor, kosan, gaming hingga bisnis Anda. Kami bantu rekomendasikan provider terbaik sesuai lokasi & budget Anda.', group: 'hero' },
    { key: 'countdown_end', value: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), group: 'promo' },
    { key: 'countdown_text', value: 'Promo pemasangan bulan ini berakhir dalam:', group: 'promo' },
    { key: 'countdown_enabled', value: 'true', group: 'promo' },
    { key: 'popup_enabled', value: 'true', group: 'popup' },
    { key: 'popup_delay', value: '10', group: 'popup' },
    { key: 'notification_enabled', value: 'true', group: 'notification' },
    { key: 'notification_interval', value: '15', group: 'notification' },
  ];

  for (const s of settings) {
    const exists = await db.setting.findFirst({ where: { key: s.key } });
    if (!exists) {
      await db.setting.create({ data: s });
    }
  }

  // Create SEO settings
  const seoSettings = [
    {
      page: 'home',
      metaTitle: 'Pasang WiFi Murah Bandung | Internet Cepat & Stabil',
      metaDesc: 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Provider terpercaya: IndiHome, Biznet, MyRepublic. Konsultasi gratis!',
      focusKeyword: 'wifi murah bandung, pasang wifi bandung, internet rumah bandung',
      ogImage: '',
      canonicalUrl: 'https://wifimurahbandung.web.id',
    },
  ];

  for (const s of seoSettings) {
    const exists = await db.seoSetting.findFirst({ where: { page: s.page } });
    if (!exists) {
      await db.seoSetting.create({ data: s });
    }
  }

  // Create popups
  const existingPopup = await db.popup.findFirst();
  if (!existingPopup) {
    await db.popup.create({
      data: {
        type: 'delay',
        title: '🎉 Promo Pemasangan WiFi!',
        subtitle: 'Dapatkan GRATIS biaya pemasangan + modem untuk pelanggan baru. Terbatas!',
        ctaText: 'Konsultasi Gratis',
        ctaUrl: 'https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20promo%20pemasangan%20WiFi',
        isActive: true,
        delay: 10,
        showOnce: true,
      },
    });
  }

  // Create notifications
  const notifications = [
    { name: 'Rizky', location: 'Cimahi', action: 'baru saja konsultasi pemasangan WiFi', timeAgo: '5 menit lalu' },
    { name: 'Sari', location: 'Bandung Kota', action: 'baru saja cek coverage area', timeAgo: '12 menit lalu' },
    { name: 'Budi', location: 'Cibiru', action: 'baru saja pasang internet rumah', timeAgo: '25 menit lalu' },
    { name: 'Dewi', location: 'Lembang', action: 'baru saja daftar paket gaming', timeAgo: '1 jam lalu' },
    { name: 'Ahmad', location: 'Soreang', action: 'baru saja konsultasi WiFi kantor', timeAgo: '2 jam lalu' },
    { name: 'Linda', location: 'Pasteur', action: 'baru saja pasang WiFi usaha', timeAgo: '3 jam lalu' },
  ];

  for (const n of notifications) {
    const exists = await db.notification.findFirst({ where: { name: n.name, action: n.action } });
    if (!exists) {
      await db.notification.create({ data: n });
    }
  }

  console.log('✅ Seeding complete!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
