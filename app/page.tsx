"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA DARI PDF ANDA ---

const teamMembers = [
  { 
    name: "Dr. Ir. Catur Aries Rokhmana, S.T., M.T.", 
    nim: "Dosen Pembimbing", 
    role: "Supervisor",
    foto: "/team/pak-catur.jpeg" 
  },
  { 
    name: "Rizal Ahmad Fahreza", 
    nim: "22/505334/TK/55290", 
    role: "Surveyor & Processing",
    foto: "/team/rizal.jpeg" 
  },
  { 
    name: "Abil Pilar Surastu", 
    nim: "22/504906/TK/55236", 
    role: "Surveyor & Processing",
    foto: "/team/abil.jpeg" 
  },
  { 
    name: "Zahra Nico Fadla", 
    nim: "Dosen Pembimbing", 
    role: "Supervisor",
    foto: "/team/zahra.jpeg" 
  },
  { 
    name: "Fatma Riziqiamurti Arina", 
    nim: "22/505334/TK/55290", 
    role: "Surveyor & Processing",
    foto: "/team/fatma.jpeg" 
  },
  { 
    name: "Alif Zacky Gunawan", 
    nim: "22/504906/TK/55236", 
    role: "Surveyor & Processing",
    foto: "/team/alif.jpeg" 
  },
];

// UPDATE: Struktur data products diubah agar menampung 2 gambar (images array)
// images[0] = Foto Asli/Render
// images[1] = Foto SketchUp/Detail
const products = [
  { 
    name: "Gedung BNI 46", 
    desc: "Gedung Bank Negara Indonesia (BNI) di kawasan Titik Nol Kilometer Yogyakarta merupakan bangunan bersejarah peninggalan kolonial Belanda yang dibangun pada tahun 1920-an dan dirancang oleh arsitek Johan Louwrens Ghijsels.", 
    images: ["/bangunan/bni.jpeg", "/sketchup/sbni.jpeg"] 
  },
  { 
    name: "Pasar Beringharjo", 
    desc: "Pasar Beringharjo merupakan pasar tertua di Yogyakarta yang telah berfungsi sebagai pusat perdagangan sejak akhir abad ke-18, tak lama setelah berdirinya Keraton Yogyakarta. Bangunan pasar permanen mulai dibangun pada tahun 1925 pada masa Sri Sultan Hamengku Buwono VIII, dengan nama “Beringharjo” yang melambangkan harapan akan kesejahteraan masyarakat.", 
    images: ["/bangunan/pasar.jpeg", "/sketchup/spasar.jpeg"] 
  },
  { 
    name: "Gereja Kawasan Malioboro", 
    desc: "Bangunan Gereja \"Margamulya\" adalah termasuk bangunan tradisional (Vernacular) dengan style kolonial,  berusia kurang lebih 146 tahun. Gereja ini merupakan warisan dari Indischekerk.  Disebut juga Gereja Protestan Indonesia Bagian Barat (GPIB) Marga Mulya. Merupakan gerejatertua di DIY, didirikan pada tanggal 15 Oktober 1857 dan diresmikan oleh Sri Sultan HB VI  tahun 1857.", 
    images: ["/bangunan/gereja.jpeg", "/sketchup/sgereja.jpeg"] 
  },
  { 
    name: "Kantor Pos Besar", 
    desc: "Gedung Kantor Pos Besar di Titik Nol Kilometer Yogyakarta merupakan bangunan bersejarah peninggalan kolonial Belanda yang telah berfungsi sebagai kantor pos sejak awal abad ke-20. Bangunan ini mulai dibangun pada tahun 1912 dengan gaya arsitektur khas Belanda dan awalnya dikenal sebagai Post, Telegraaf en Telefoon Kantoor.", 
    images: ["/bangunan/kantor-pos.jpeg", "/sketchup/spos.jpeg"] 
  },
  { 
    name: "Teras Malioboro", 
    desc: "Teras Malioboro merupakan kawasan penataan ulang pedagang kaki lima (PKL) Malioboro yang mulai diresmikan pada tahun 2021 oleh Pemerintah Daerah Istimewa Yogyakarta. Kawasan ini dibangun sebagai upaya penataan ruang publik, pelestarian kawasan heritage Malioboro, serta peningkatan kenyamanan pejalan kaki dan aktivitas wisata di pusat kota Yogyakarta.", 
    images: ["/bangunan/teras.jpeg", "/sketchup/steras.jpeg"] 
  },
  { 
    name: "Toko Hamzah Batik", 
    desc: "Hamzah Batik dikenal sebagai pusat batik premium dan busana tradisional Jawa yang menawarkan beragam produk batik dari pengrajin lokal serta berfungsi sebagai toko batik dan oleh-oleh budaya bagi masyarakat dan wisatawan di Yogyakarta.", 
    images: ["/bangunan/hamzah.jpeg", "/sketchup/shamzah.jpeg"] 
  },
];

const workflows = [
  { title: "Studi Literatur & Survei", desc: "Studi pendahuluan dan survei awal lokasi sepanjang Malioboro - Titik Nol KM." },
  { title: "Akuisisi Data", desc: "Pengambilan data lapangan menggunakan Mobile LiDAR SLAM untuk menangkap geometri kompleks." },
  { title: "Processing Point Cloud", desc: "Registrasi dan filtering data mentah (format .LAS) menggunakan Cloud Compare." },
  { title: "3D Modeling", desc: "Rekonstruksi model fasad bangunan menggunakan perangkat lunak SketchUp." },
  { title: "Analisis & Integrasi", desc: "Analisis akurasi geometri dan penggabungan model tekstur." },
];

const equipments = [
  { 
    title: "Receiver GPS Geodetik (Geomate SG7)", 
    desc: "Alat akuisisi data utama untuk menangkap point cloud lingkungan secara real-time sambil bergerak.", 
    img: "/alat/receiver.jpeg" 
  },
  { 
    title: "LiDAR SLAM GS100G", 
    desc: "Perangkat komputasi spek tinggi untuk registrasi point cloud, filtering, dan rendering model.", 
    img: "/alat/lidar.jpeg" 
  },
];

const streetProduct = {
  name: "Koridor Jalan Malioboro",
  desc: "Jalan Malioboro–Margo Mulyo–Titik Nol Kilometer Yogyakarta merupakan jalur utama kota yang berkembang sejak berdirinya Keraton Yogyakarta. Kawasan ini menjadi pusat aktivitas perdagangan, pemerintahan, dan ruang publik, serta hingga kini dikenal sebagai kawasan bersejarah di pusat Kota Yogyakarta.",
  images: ["/koridor/kthumb.jpeg", "/koridor/kcontent2.jpeg", "/koridor/kcontent3.jpeg", "/koridor/kcontent4.jpeg", "/koridor/kcontent5.jpeg", "/koridor/kcontent6.jpeg" ] // Ganti dengan nama file aslimu
};

// --- KOMPONEN UTAMA ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // STATE UNTUK MODAL POPUP
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Menyimpan produk yang sedang dibuka
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Menyimpan index gambar (0 atau 1)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // FUNGSI MEMBUKA MODAL
  const openModal = (product: any) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset ke gambar pertama setiap kali buka baru
  };

  // FUNGSI MENUTUP MODAL
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // FUNGSI NAVIGASI GAMBAR (NEXT/PREV)
  // FUNGSI NAVIGASI GAMBAR (NEXT/PREV) - LOGIKA DINAMIS
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">GEODESI<span className="text-orange-600">UGM</span></div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            {['Home', 'About', 'Equipment', 'Workflow', 'Product', 'Documentation', 'Team'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-blue-900 transition">
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4 shadow-lg">
            {['Home', 'About', 'Equipment', 'Workflow', 'Product', 'Documentation', 'Team'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left font-medium hover:text-blue-900">
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-slate-900 text-white pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/api/placeholder/1920/1080" alt="Background Point Cloud" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h2 className="text-orange-500 font-bold tracking-widest mb-4">PROYEK REKAYASA GEODESI GEOMATIKA 2025 - KELOMPOK 18</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Pemodelan dan Dokumentasi Digital <br />Fasad Jalan Kawasan Titik Nol KM Yogyakarta Menggunakan<br /> Mobile LiDAR SLAM
          </h1>
          <button onClick={() => scrollToSection('about')} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center mx-auto gap-2">
            Jelajahi Model <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="Suasana Malioboro" className="rounded-lg shadow-xl" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-orange-600 font-bold tracking-wider mb-2">LATAR BELAKANG</h3>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Mengapa Malioboro Perlu Didigitalkan?</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Jalan Malioboro merupakan jantung perekonomian dan kawasan warisan budaya Yogyakarta. Namun, tantangan pelestarian menuntut dokumentasi yang lebih dari sekadar foto 2D.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Proyek ini memanfaatkan teknologi <strong>LiDAR (Light Detection and Ranging)</strong> dipadukan dengan algoritma <strong>SLAM</strong>. Solusi ini memungkinkan akuisisi data 3D spasial yang cepat, resolusi tinggi, dan akurat untuk keperluan manajemen aset dan pelestarian cagar budaya.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-900">
                  <h4 className="font-bold text-blue-900">Akurasi Tinggi</h4>
                  <p className="text-sm text-gray-500">Data geometri presisi sentimeter.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <h4 className="font-bold text-blue-900">Efisiensi Waktu</h4>
                  <p className="text-sm text-gray-500">Akuisisi cepat metode mobile scanning.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT SECTION */}
      <section id="equipment" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-orange-600 font-bold tracking-wider mb-2">PERALATAN</h3>
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Teknologi yang Digunakan</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {equipments.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:-translate-y-2 transition duration-300 overflow-hidden flex flex-col">
                <div className="h-48 w-full bg-gray-200 relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col items-center">
                  <h4 className="text-xl font-bold mb-3 text-blue-900">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-orange-600 font-bold tracking-wider mb-2">ALUR KERJA</h3>
            <h2 className="text-3xl font-bold text-blue-900">Metodologi Penelitian</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            <div className="space-y-12">
              {workflows.map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full md:w-1/2 p-6">
                    <div className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${index % 2 === 0 ? 'border-blue-900 md:text-left' : 'border-orange-600 md:text-right'} text-center`}>
                      <span className="text-5xl font-bold text-slate-100 absolute -mt-10 mx-auto left-0 right-0 z-0">{index + 1}</span>
                      <h4 className="text-xl font-bold text-gray-800 relative z-10">{step.title}</h4>
                      <p className="text-gray-600 mt-2 text-sm relative z-10">{step.desc}</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12">
                     <div className="w-4 h-4 bg-blue-900 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="flex-1 w-full md:w-1/2 p-6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION (HASIL KEGIATAN) */}
      <section id="product" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-orange-500 font-bold tracking-wider mb-2">HASIL KEGIATAN</h3>
            <h2 className="text-3xl font-bold text-white">Model 3D Bangunan Heritage</h2>
            <p className="text-gray-400 mt-4">Hasil rekonstruksi digital dari data point cloud menjadi model 3D bertekstur.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700">
                <div className="aspect-video relative overflow-hidden">
                  {/* Tampilkan gambar pertama (images[0]) sebagai thumbnail */}
                  <img src={item.images[0]} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  
                  {/* Overlay dengan Tombol */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    {/* BUTTON TRIGGER MODAL */}
                    <button 
                      onClick={() => openModal(item)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full text-sm font-bold transition transform hover:scale-105"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                  <p className="text-gray-400 text-sm line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* --- TAMBAHAN BARU: KORIDOR JALAN (FULL WIDTH) --- */}
          {/* Letakkan tepat DI SINI (di bawah penutup div grid, tapi masih di dalam container section) */}
          
          <div className="mt-8"> {/* Memberi jarak ke atas */}
            <div className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 w-full">
              
              {/* Gambar dibuat lebih lebar (aspect ratio 21:9 atau custom) agar cocok memanjang */}
              <div className="relative overflow-hidden w-full h-64 md:h-80">
                <img 
                  src={streetProduct.images[0]} 
                  alt={streetProduct.name} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700" 
                />
                
                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => openModal(streetProduct)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
                  >
                    Lihat Detail Koridor
                  </button>
                </div>
              </div>

              {/* Keterangan Teks */}
              <div className="p-8 border-t border-slate-700 bg-slate-800/50 backdrop-blur">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-orange-500">{streetProduct.name}</h4>
                    <p className="text-gray-300 text-base max-w-3xl">{streetProduct.desc}</p>
                  </div>
                  {/* Icon Panah atau hiasan jika perlu */}
                  <div className="hidden md:block text-orange-600">
                    <ArrowRight size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --- AKHIR TAMBAHAN --- */}

        </div>
      </section>
        {/* </div>
      </section> */}

      {/* --- MODAL POPUP COMPONENT --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop (Klik di luar untuk close) */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>

          {/* Modal Content */}
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative z-10 flex flex-col md:flex-row animate-fadeIn">
            
            {/* Bagian Kiri: Slider Gambar */}
            <div className="w-full md:w-2/3 relative h-64 md:h-[500px] bg-gray-100">
              <img 
                src={selectedProduct.images[currentImageIndex]} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Tombol Navigasi Slider */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full backdrop-blur transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-2 rounded-full backdrop-blur transition"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indikator Gambar (Optional) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                {/* Logika: Jika cuma 2 gambar, pakai teks Asli/SketchUp. Jika lebih, pakai nomor halaman */}
                {selectedProduct.images.length === 2 ? (
                   currentImageIndex === 0 ? "Foto Asli" : "Model SketchUp"
                ) : (
                   `Galeri (${currentImageIndex + 1} / ${selectedProduct.images.length})`
                )}
              </div>
            </div>

            {/* Bagian Kanan: Detail & Deskripsi */}
            <div className="w-full md:w-1/3 p-8 flex flex-col relative bg-white">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                <X size={24} />
              </button>
              
              <div className="mt-4">
                <span className="text-orange-600 font-bold text-sm tracking-widest uppercase">DETAIL BANGUNAN</span>
                <h3 className="text-2xl font-bold text-blue-900 mt-2 mb-4">{selectedProduct.name}</h3>
                <div className="h-1 w-20 bg-orange-500 mb-6"></div>
                
                <p className="text-gray-600 leading-relaxed text-justify mb-6">
                  {selectedProduct.desc}
                </p>

                {/* <div className="mt-auto p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-gray-800 text-sm mb-2">Spesifikasi Model:</h4>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Format: SketchUp (.skp)</li>
                    <li>• Texture: Photogrammetry</li>
                    <li>• Source: Mobile LiDAR SLAM</li> */}
                  {/* </ul> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTATION SECTION */}
      <section id="documentation" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-orange-600 font-bold tracking-wider mb-2">DOKUMENTASI</h3>
            <h2 className="text-3xl font-bold text-blue-900">Galeri Kegiatan Lapangan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 relative h-64 md:h-96 rounded-lg overflow-hidden">
                <img src="/api/placeholder/800/800" alt="Kegiatan 1" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/api/placeholder/400/400" alt="Kegiatan 2" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/api/placeholder/400/400" alt="Kegiatan 3" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="col-span-2 relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/api/placeholder/800/400" alt="Kegiatan 4" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-orange-600 font-bold tracking-wider mb-2">TIM KAMI</h3>
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Kontributor Proyek</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 border-transparent hover:border-blue-900">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={member.foto} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">{member.name}</h4>
                <p className="text-orange-600 text-xs font-semibold uppercase mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.nim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-10 border-t border-blue-800">
        <div className="container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h5 className="text-xl font-bold">Teknik Geodesi UGM</h5>
            <p className="text-blue-200 text-sm mt-1">Inventarisasi Kawasan Warisan Budaya.</p>
          </div>
          <div className="text-sm text-blue-300">
            &copy; {new Date().getFullYear()} Tim Malioboro LiDAR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}