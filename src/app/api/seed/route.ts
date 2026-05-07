export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// This endpoint seeds the database with initial data
// Call it once after deployment: GET /api/seed
// IMPORTANT: Disable or protect this endpoint after seeding!

export async function GET() {
  try {
    // Check if already seeded
    const userCount = await db.user.count();
    if (userCount > 0) {
      return NextResponse.json({ message: 'Database already seeded. Skipping.', userCount });
    }

    console.log('🌱 Seeding database...');

    // Create admin user
    await db.user.create({
      data: {
        email: 'admin@wifimurahbandung.web.id',
        name: 'Admin',
        password: 'admin123',
        role: 'admin',
      },
    });

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
    await db.provider.createMany({ data: providers, skipDuplicates: true });

    // Create trust indicators
    const trustIndicators = [
      { icon: 'Users', value: '1000+', label: 'Pelanggan Terbantu', order: 1 },
      { icon: 'MapPin', value: 'Bandung Raya', label: 'Coverage Area', order: 2 },
      { icon: 'Shield', value: 'Terpercaya', label: 'Provider Resmi', order: 3 },
      { icon: 'Zap', value: 'Cepat', label: 'Respon Cepat', order: 4 },
      { icon: 'MessageCircle', value: 'Gratis', label: 'Konsultasi', order: 5 },
    ];
    await db.trustIndicator.createMany({ data: trustIndicators, skipDuplicates: true });

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
    await db.keunggulan.createMany({ data: keunggulan, skipDuplicates: true });

    // Create testimonials
    const testimonials = [
      { name: 'Rizky Pratama', location: 'Cimahi', review: 'Pemasangan cepat dan internet stabil. Saya bisa WFH tanpa kendala. Terima kasih Wifi Murah Bandung!', rating: 5, order: 1 },
      { name: 'Siti Nurhaliza', location: 'Bandung Kota', review: 'Awalnya bingung pilih provider, tapi tim sangat membantu merekomendasikan paket yang sesuai budget.', rating: 5, order: 2 },
      { name: 'Budi Santoso', location: 'Cibiru', review: 'Untuk gaming sangat lancar, ping rendah. Cocok buat yang suka main game online.', rating: 5, order: 3 },
      { name: 'Dewi Lestari', location: 'Lembang', review: 'Koneksi untuk kosan saya sekarang stabil. Harga juga terjangkau untuk mahasiswa.', rating: 4, order: 4 },
      { name: 'Ahmad Fauzi', location: 'Soreang', review: 'Saya pasang untuk usaha kafe, pelanggan puas dengan WiFi gratis yang cepat!', rating: 5, order: 5 },
      { name: 'Linda Wijaya', location: 'Pasteur', review: 'Proses dari konsultasi sampai pemasangan hanya 2 hari. Sangat profesional.', rating: 5, order: 6 },
    ];
    await db.testimonial.createMany({ data: testimonials, skipDuplicates: true });

    // Create FAQs
    const faqs = [
      { question: 'Provider apa saja yang tersedia?', answer: 'Kami bekerja sama dengan berbagai provider terkemuka seperti IndiHome, Biznet, MyRepublic, First Media, ICONNET, XL Satu, CBN, dan MNC Play. Kami akan merekomendasikan provider terbaik sesuai lokasi dan kebutuhan Anda.', order: 1 },
      { question: 'Berapa biaya pemasangan?', answer: 'Biaya pemasangan bervariasi tergantung provider dan paket yang dipilih. Ada promo bebas biaya pemasangan untuk paket tertentu. Hubungi kami untuk info promo terkini.', order: 2 },
      { question: 'Berapa lama proses instalasi?', answer: 'Proses instalasi biasanya 1-3 hari kerja setelah survey lokasi. Untuk area tertentu bisa lebih cepat. Tim kami akan memberikan estimasi waktu yang lebih akurat.', order: 3 },
      { question: 'Apakah tersedia di area saya?', answer: 'Kami melayani area Bandung Raya termasuk Bandung Kota, Cimahi, Kabupaten Bandung, dan sekitarnya. Silakan cek coverage melalui formulir kami atau hubungi via WhatsApp.', order: 4 },
      { question: 'Bisa untuk usaha/kantor?', answer: 'Tentu! Kami menyediakan paket khusus untuk kebutuhan bisnis, kantor, kafe, dan enterprise dengan bandwidth lebih besar dan SLA yang terjamin.', order: 5 },
      { question: 'Apakah ada internet unlimited?', answer: 'Ya, sebagian besar provider yang kami tawarkan memiliki paket unlimited tanpa FUP. Kami akan bantu pilihkan paket unlimited yang sesuai dengan budget Anda.', order: 6 },
    ];
    await db.faq.createMany({ data: faqs, skipDuplicates: true });

    // Create article categories
    const categories = [
      { name: 'Tips & Trik', slug: 'tips-trik', description: 'Tips dan trik seputar internet dan WiFi', order: 1 },
      { name: 'Promo', slug: 'promo', description: 'Promo dan diskon pemasangan internet', order: 2 },
      { name: 'Review Provider', slug: 'review-provider', description: 'Review dan perbandingan provider internet', order: 3 },
      { name: 'Tutorial', slug: 'tutorial', description: 'Tutorial setting dan konfigurasi internet', order: 4 },
    ];
    await db.articleCategory.createMany({ data: categories, skipDuplicates: true });

    // Create sample articles
    const tipsCat = await db.articleCategory.findFirst({ where: { slug: 'tips-trik' } });
    const promoCat = await db.articleCategory.findFirst({ where: { slug: 'promo' } });
    const reviewCat = await db.articleCategory.findFirst({ where: { slug: 'review-provider' } });

    if (tipsCat) {
      await db.article.createMany({
        skipDuplicates: true,
        data: [
          {
            title: '5 Tips Memilih Internet Rumah yang Tepat di Bandung',
            slug: 'tips-memilih-internet-rumah-bandung',
            content: 'Memilih internet rumah yang tepat bisa menjadi tantangan. Berikut 5 tips yang bisa membantu Anda:\n\n## 1. Tentukan Kebutuhan Bandwidth\nUntuk browsing dan media sosial, 10-20 Mbps sudah cukup. Untuk streaming 4K dan gaming, pilih 50 Mbps ke atas.\n\n## 2. Cek Coverage Area\nTidak semua provider tersedia di semua area.\n\n## 3. Bandingkan Harga\nJangan langsung ambil paket pertama.\n\n## 4. Perhatikan FUP\nPilih paket unlimited jika Anda pengguna berat.\n\n## 5. Baca Review\nCari tahu pengalaman pelanggan lain.',
            excerpt: 'Panduan lengkap memilih internet rumah yang tepat di Bandung.',
            metaTitle: '5 Tips Memilih Internet Rumah yang Tepat di Bandung | Wifi Murah Bandung',
            metaDesc: 'Panduan lengkap memilih internet rumah di Bandung. Tips cek coverage, bandwidth, FUP, dan perbandingan harga.',
            focusKeyword: 'internet rumah bandung',
            published: true,
            categoryId: tipsCat.id,
          },
          {
            title: 'Cara Setting WiFi Router untuk Kecepatan Optimal',
            slug: 'cara-setting-wifi-router-optimal',
            content: 'Setting router WiFi yang tepat bisa meningkatkan kecepatan internet Anda secara signifikan.\n\n## Posisi Router yang Ideal\nLetakkan router di tengah rumah, di tempat tinggi.\n\n## Pilih Channel yang Tepat\nGunakan channel yang tidak ramai.\n\n## Update Firmware\nPastikan firmware router selalu terupdate.\n\n## Gunakan Band 5GHz\nUntuk perangkat yang mendukung, gunakan band 5GHz.',
            excerpt: 'Panduan setting WiFi router untuk kecepatan optimal.',
            metaTitle: 'Cara Setting WiFi Router untuk Kecepatan Optimal | Wifi Murah Bandung',
            metaDesc: 'Tutorial setting WiFi router untuk kecepatan internet optimal.',
            focusKeyword: 'setting wifi router',
            published: true,
            categoryId: tipsCat.id,
          },
        ],
      });
    }

    if (promoCat) {
      await db.article.create({
        data: {
          title: 'Promo Pemasangan WiFi Gratis Bandung 2024',
          slug: 'promo-pemasangan-wifi-gratis-bandung',
          content: 'Dapatkan promo pemasangan WiFi gratis di Bandung!\n\n## Promo Tersedia\n- **IndiHome**: Bebas biaya pemasangan + modem gratis\n- **Biznet**: Diskon 50% biaya instalasi\n- **MyRepublic**: Free installation + 1 bulan gratis\n\nSegera hubungi kami!',
          excerpt: 'Promo pemasangan WiFi gratis di Bandung. Penawaran terbatas!',
          metaTitle: 'Promo Pemasangan WiFi Gratis Bandung 2024 | Wifi Murah Bandung',
          metaDesc: 'Dapatkan promo pemasangan WiFi gratis di Bandung.',
          focusKeyword: 'promo wifi bandung',
          published: true,
          categoryId: promoCat.id,
        },
      });
    }

    if (reviewCat) {
      await db.article.create({
        data: {
          title: 'Perbandingan IndiHome vs Biznet vs MyRepublic di Bandung',
          slug: 'perbandingan-indihome-biznet-myrepublic-bandung',
          content: 'Bingung pilih provider internet di Bandung? Berikut perbandingan tiga provider populer.\n\n## IndiHome\n- Kecepatan: 10-300 Mbps\n- Harga: Mulai Rp 275.000/bulan\n\n## Biznet\n- Kecepatan: 25-250 Mbps\n- Harga: Mulai Rp 299.000/bulan\n\n## MyRepublic\n- Kecepatan: 50-250 Mbps\n- Harga: Mulai Rp 249.000/bulan',
          excerpt: 'Perbandingan lengkap IndiHome, Biznet, dan MyRepublic di Bandung.',
          metaTitle: 'IndiHome vs Biznet vs MyRepublic Bandung | Wifi Murah Bandung',
          metaDesc: 'Perbandingan IndiHome vs Biznet vs MyRepublic di Bandung.',
          focusKeyword: 'provider internet bandung',
          published: true,
          categoryId: reviewCat.id,
        },
      });
    }

    // Create settings
    const settings = [
      { key: 'wa_number', value: '6281234567890', group: 'contact' },
      { key: 'wa_greeting', value: 'Halo, saya tertarik untuk pasang WiFi di Bandung. Bisa bantu info lebih lanjut?', group: 'contact' },
      { key: 'site_name', value: 'Wifi Murah Bandung', group: 'general' },
      { key: 'site_description', value: 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Konsultasi gratis!', group: 'general' },
      { key: 'hero_headline', value: 'Pasang WiFi Murah Bandung', group: 'hero' },
      { key: 'hero_subheadline', value: 'Internet Cepat, Stabil & Harga Terjangkau', group: 'hero' },
      { key: 'countdown_enabled', value: 'true', group: 'promo' },
      { key: 'countdown_text', value: 'Promo pemasangan bulan ini berakhir dalam:', group: 'promo' },
      { key: 'popup_enabled', value: 'true', group: 'popup' },
      { key: 'popup_delay', value: '10', group: 'popup' },
      { key: 'notification_enabled', value: 'true', group: 'notification' },
      { key: 'notification_interval', value: '15', group: 'notification' },
    ];
    for (const s of settings) {
      await db.setting.upsert({
        where: { key: s.key },
        update: { value: s.value },
        create: s,
      });
    }

    // Create SEO settings
    await db.seoSetting.upsert({
      where: { page: 'home' },
      update: {},
      create: {
        page: 'home',
        metaTitle: 'Pasang WiFi Murah Bandung | Internet Cepat & Stabil',
        metaDesc: 'Pasang WiFi murah di Bandung. Internet cepat, stabil & harga terjangkau. Provider terpercaya: IndiHome, Biznet, MyRepublic. Konsultasi gratis!',
        focusKeyword: 'wifi murah bandung, pasang wifi bandung, internet rumah bandung',
        canonicalUrl: 'https://wifimurahbandung.web.id',
      },
    });

    // Create popup
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

    // Create notifications
    const notifications = [
      { name: 'Rizky', location: 'Cimahi', action: 'baru saja konsultasi pemasangan WiFi', timeAgo: '5 menit lalu' },
      { name: 'Sari', location: 'Bandung Kota', action: 'baru saja cek coverage area', timeAgo: '12 menit lalu' },
      { name: 'Budi', location: 'Cibiru', action: 'baru saja pasang internet rumah', timeAgo: '25 menit lalu' },
      { name: 'Dewi', location: 'Lembang', action: 'baru saja daftar paket gaming', timeAgo: '1 jam lalu' },
      { name: 'Ahmad', location: 'Soreang', action: 'baru saja konsultasi WiFi kantor', timeAgo: '2 jam lalu' },
      { name: 'Linda', location: 'Pasteur', action: 'baru saja pasang WiFi usaha', timeAgo: '3 jam lalu' },
    ];
    await db.notification.createMany({ data: notifications, skipDuplicates: true });

    console.log('✅ Seeding complete!');

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        providers: providers.length,
        testimonials: testimonials.length,
        faqs: faqs.length,
        categories: categories.length,
        settings: settings.length,
        notifications: notifications.length,
      },
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: String(error) },
      { status: 500 }
    );
  }
}
