'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Kebijakan Privasi
            </h1>
            <p className="text-white/80 text-sm">
              Terakhir diperbarui: 1 Maret 2025
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>1. Pendahuluan</h2>
              <p>
                Wifi Murah Bandung (&quot;kami&quot;, &quot;milik kami&quot;, atau &quot;kami&quot;) berkomitmen untuk
                melindungi privasi pengunjung website kami. Kebijakan Privasi ini menjelaskan
                bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda
                ketika Anda menggunakan website kami di wifimurahbandung.com.
              </p>
              <p>
                Dengan mengakses dan menggunakan website kami, Anda menyetujui praktik yang
                dijelaskan dalam Kebijakan Privasi ini.
              </p>

              <h2>2. Informasi yang Kami Kumpulkan</h2>
              <h3>2.1 Informasi yang Anda Berikan</h3>
              <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, termasuk:</p>
              <ul>
                <li>Nama lengkap</li>
                <li>Nomor WhatsApp/telepon</li>
                <li>Alamat email</li>
                <li>Alamat pemasangan</li>
                <li>Informasi kebutuhan internet (jenis kebutuhan, budget, provider pilihan)</li>
                <li>Pesan atau pertanyaan yang Anda kirimkan</li>
              </ul>

              <h3>2.2 Informasi yang Dikumpulkan Secara Otomatis</h3>
              <p>
                Saat Anda mengunjungi website kami, kami secara otomatis mengumpulkan informasi
                tertentu, termasuk:
              </p>
              <ul>
                <li>Alamat IP</li>
                <li>Jenis browser dan perangkat</li>
                <li>Halaman yang dikunjungi dan waktu kunjungan</li>
                <li>Sumber referensi (dari mana Anda berasal)</li>
                <li>Data cookies dan teknologi pelacakan serupa</li>
              </ul>

              <h2>3. Penggunaan Informasi</h2>
              <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
              <ul>
                <li>Menanggapi pertanyaan dan permintaan konsultasi Anda</li>
                <li>Memproses permintaan pemasangan layanan internet</li>
                <li>Menghubungi Anda terkait status layanan</li>
                <li>Mengirimkan informasi promosi dan penawaran (dengan persetujuan Anda)</li>
                <li>Meningkatkan kualitas layanan dan pengalaman pengguna website</li>
                <li>Menganalisis penggunaan website untuk keperluan optimasi</li>
                <li>Memenuhi kewajiban hukum yang berlaku</li>
              </ul>

              <h2>4. Perlindungan Informasi</h2>
              <p>
                Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi
                pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.
                Langkah-langkah ini termasuk:
              </p>
              <ul>
                <li>Enkripsi data saat transmisi menggunakan protokol SSL/TLS</li>
                <li>Pembatasan akses terhadap informasi pribadi hanya kepada karyawan yang membutuhkan</li>
                <li>Penyimpanan data yang aman dengan perlindungan fisik dan digital</li>
              </ul>

              <h2>5. Pembagian Informasi</h2>
              <p>Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda. Kami dapat membagikan informasi Anda dengan:</p>
              <ul>
                <li>
                  <strong>Provider Internet:</strong> Untuk memproses permintaan pemasangan layanan Anda
                </li>
                <li>
                  <strong>Penyedia Layanan:</strong> Pihak ketiga yang membantu kami dalam operasional bisnis (hosting, analitik)
                </li>
                <li>
                  <strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum atau proses hukum yang berlaku
                </li>
              </ul>

              <h2>6. Cookies</h2>
              <p>
                Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies
                adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser Anda
                untuk menolak cookies, namun beberapa fitur website mungkin tidak berfungsi dengan
                baik.
              </p>

              <h2>7. Hak Anda</h2>
              <p>Anda memiliki hak untuk:</p>
              <ul>
                <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                <li>Meminta perbaikan informasi yang tidak akurat</li>
                <li>Meminta penghapusan informasi pribadi Anda</li>
                <li>Menolak menerima komunikasi pemasaran dari kami</li>
              </ul>

              <h2>8. Perubahan Kebijakan</h2>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan
                dipublikasikan di halaman ini dengan tanggal pembaruan yang baru. Kami menyarankan
                Anda untuk meninjau kebijakan ini secara berkala.
              </p>

              <h2>9. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami:
              </p>
              <ul>
                <li>Email: info@wifimurahbandung.com</li>
                <li>WhatsApp: 0812-3456-7890</li>
                <li>Alamat: Jl. Dago No. 123, Bandung, Jawa Barat 40135</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
