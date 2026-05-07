'use client'

import Navbar from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/80 pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-white/80 text-sm">
              Terakhir diperbarui: 1 Maret 2025
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>1. Ketentuan Umum</h2>
              <p>
                Dengan mengakses dan menggunakan layanan Wifi Murah Bandung (&quot;Layanan&quot;), Anda
                menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui
                ketentuan ini, harap tidak menggunakan Layanan kami.
              </p>
              <p>
                Wifi Murah Bandung adalah layanan konsultasi dan fasilitasi pemasangan internet yang
                menghubungkan pelanggan dengan provider internet terpercaya.
              </p>

              <h2>2. Layanan</h2>
              <p>Layanan kami meliputi:</p>
              <ul>
                <li>Konsultasi gratis untuk kebutuhan internet di wilayah Bandung Raya</li>
                <li>Fasilitasi pemasangan layanan internet melalui provider partner</li>
                <li>Bantuan pemilihan paket internet yang sesuai dengan kebutuhan dan budget</li>
                <li>Dukungan koordinasi dengan provider untuk proses instalasi</li>
              </ul>
              <p>
                Kami bertindak sebagai fasilitator dan konsultan. Layanan internet yang Anda terima
                merupakan tanggung jawab masing-masing provider.
              </p>

              <h2>3. Kewajiban Pengguna</h2>
              <p>Sebagai pengguna Layanan, Anda setuju untuk:</p>
              <ul>
                <li>Memberikan informasi yang benar dan akurat saat mengisi formulir</li>
                <li>Tidak menggunakan Layanan untuk tujuan yang melanggar hukum</li>
                <li>Tidak menyalin, memodifikasi, atau mendistribusikan konten website tanpa izin</li>
                <li>Menjaga kerahasiaan informasi akun Anda</li>
              </ul>

              <h2>4. Proses Pemasangan</h2>
              <h3>4.1 Permintaan Pemasangan</h3>
              <p>
                Setelah Anda mengajukan permintaan melalui formulir atau WhatsApp, tim kami akan
                menghubungi Anda untuk konfirmasi dan penjadwalan survey lokasi.
              </p>

              <h3>4.2 Survey Lokasi</h3>
              <p>
                Survey lokasi dilakukan untuk memastikan ketersediaan jaringan di area Anda. Hasil
                survey menentukan apakah pemasangan dapat dilakukan.
              </p>

              <h3>4.3 Jadwal Instalasi</h3>
              <p>
                Jadwal instalasi ditentukan berdasarkan ketersediaan teknisi dan persetujuan Anda.
                Waktu pemasangan umumnya 1-3 hari kerja setelah survey, tergantung provider.
              </p>

              <h2>5. Harga dan Pembayaran</h2>
              <ul>
                <li>
                  Harga layanan internet ditentukan oleh masing-masing provider dan dapat berubah
                  sewaktu-waktu
                </li>
                <li>Konsultasi melalui website kami bersifat gratis dan tanpa kewajiban</li>
                <li>
                  Biaya pemasangan (jika ada) akan diinformasikan sebelum proses instalasi dimulai
                </li>
                <li>
                  Pembayaran tagihan bulanan dilakukan langsung ke provider sesuai ketentuan
                  masing-masing provider
                </li>
              </ul>

              <h2>6. Batasan Tanggung Jawab</h2>
              <p>
                Wifi Murah Bandung bertindak sebagai fasilitator dan konsultan. Kami tidak bertanggung
                jawab atas:
              </p>
              <ul>
                <li>Kualitas layanan internet yang merupakan tanggung jawab provider</li>
                <li>Gangguan jaringan atau downtime yang disebabkan oleh provider</li>
                <li>Kebijakan harga atau perubahan layanan dari provider</li>
                <li>Kerugian yang timbul akibat penggunaan atau ketidakmampuan menggunakan layanan</li>
              </ul>

              <h2>7. Kebijakan Pembatalan</h2>
              <p>
                Pembatalan permintaan pemasangan dapat dilakukan sebelum proses instalasi dimulai.
                Setelah instalasi selesai, pembatalan layanan mengikuti kebijakan masing-masing
                provider.
              </p>

              <h2>8. Hak Kekayaan Intelektual</h2>
              <p>
                Seluruh konten di website ini, termasuk teks, gambar, logo, dan desain, merupakan
                milik Wifi Murah Bandung atau pihak yang memberikan lisensi. Anda tidak diperkenankan
                menggunakan konten kami tanpa izin tertulis.
              </p>

              <h2>9. Perubahan Ketentuan</h2>
              <p>
                Kami berhak mengubah Syarat & Ketentuan ini kapan saja. Perubahan akan berlaku
                segera setelah dipublikasikan di website. Penggunaan berkelanjutan atas Layanan
                setelah perubahan dianggap sebagai persetujuan Anda terhadap ketentuan yang telah
                diperbarui.
              </p>

              <h2>10. Hukum yang Berlaku</h2>
              <p>
                Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik
                Indonesia. Setiap sengketa akan diselesaikan melalui musyawarah, dan apabila tidak
                tercapai kesepakatan, akan diselesaikan melalui Pengadilan Negeri Bandung.
              </p>

              <h2>11. Hubungi Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:
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
