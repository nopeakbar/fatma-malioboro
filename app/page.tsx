"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- TYPES ---
interface Product {
  name: string;
  desc: string;
  images: string[];
}

// --- DATA DARI PDF ANDA ---

const teamMembers = [
  { 
    name: "Dr. Ir. Catur Aries Rokhmana, S.T., M.T.", 
    // nim: "Dosen Pembimbing", 
    role: "Dosen Pembimbing",
    foto: "/team/pak-catur.jpeg" 
  },
  { 
    name: "Rizal Ahmad Fahreza", 
    nim: "22/505334/TK/55290", 
    // role: "Surveyor & Processing",
    foto: "/team/rizal.jpeg" 
  },
  { 
    name: "Abil Pilar Surastu", 
    nim: "22/504138/TK/55123", 
    // role: "Surveyor & Processing",
    foto: "/team/abil.jpeg" 
  },
  { 
    name: "Zahra Nico Fadla", 
    nim: "22/503974/TK/55102", 
    // role: "Supervisor",
    foto: "/team/zahra.jpeg" 
  },
  { 
    name: "Fatma Riziqiamurti Arina", 
    nim: "22/504906/TK/55236", 
    // role: "Surveyor & Processing",
    foto: "/team/fatma.jpeg" 
  },
  { 
    name: "Alif Zacky Gunawan", 
    nim: "22/497524/TK/54529", 
    // role: "Surveyor & Processing",
    foto: "/team/alif.jpeg" 
  },
];

const products = [
  { 
    name: "Gedung BNI 46", 
    desc: "Gedung Bank Negara Indonesia (BNI) di kawasan Titik Nol Kilometer Yogyakarta merupakan bangunan bersejarah peninggalan kolonial Belanda yang dibangun pada tahun 1920-an dan dirancang oleh arsitek Johan Louwrens Ghijsels.", 
    images: ["/bangunan/bni.jpeg", "/sketchup/sbni.jpeg"] 
  },
  { 
    name: "Pasar Beringharjo", 
    desc: "Pasar Beringharjo merupakan pasar tertua di Yogyakarta yang telah berfungsi sebagai pusat perdagangan sejak akhir abad ke-18, tak lama setelah berdirinya Keraton Yogyakarta. Bangunan pasar permanen mulai dibangun pada tahun 1925 pada masa Sri Sultan Hamengku Buwono VIII, dengan nama 'Beringharjo' yang melambangkan harapan akan kesejahteraan masyarakat.", 
    images: ["/bangunan/pasar.jpeg", "/sketchup/spasar.jpeg"] 
  },
  { 
    name: "Gereja Kawasan Malioboro", 
    desc: "Bangunan Gereja 'Margamulya' adalah termasuk bangunan tradisional (Vernacular) dengan style kolonial, berusia kurang lebih 146 tahun. Gereja ini merupakan warisan dari Indischekerk. Disebut juga Gereja Protestan Indonesia Bagian Barat (GPIB) Marga Mulya. Merupakan gereja tertua di DIY, didirikan pada tanggal 15 Oktober 1857 dan diresmikan oleh Sri Sultan HB VI tahun 1857.", 
    images: ["/bangunan/gereja.jpeg", "/sketchup/sgereja.jpeg"] 
  },
  { 
    name: "Kantor Pos", 
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

// --- DATA WORKFLOW DENGAN POIN TAMBAHAN ---
const workflows = [
  { 
    title: "Studi Literatur & Survei", 
    desc: "ahapan awal meliputi studi literatur terkait spesifikasi dan pengoperasian alat Mobile LiDAR SLAM Geosun GS-100G sesuai SOP. Selanjutnya dilakukan observasi lapangan untuk menentukan area survei, jalur pengukuran, kondisi lingkungan, serta waktu akuisisi yang optimal.",
    image: "/workflow/studi.jpeg" 
  },
  { 
    title: "Akuisisi Data", 
    desc: " Pengumpulan data dilakukan menggunakan Mobile LiDAR SLAM untuk merekam geometri fasad bangunan di kawasan Titik Nol Kilometer Yogyakarta secara detail dan efisien. Akuisisi data dilakukan secara mobile tanpa titik kontrol, dengan dukungan koneksi ke stasiun CORS, mengikuti jalur pengukuran di kedua sisi koridor Jalan Malioboro dengan kecepatan pemindaian yang stabil.",
    image: "/workflow/akuisisi.jpeg" 
  },
  { 
    title: "Processing Point Cloud", 
    desc: "Pengolahan data dilakukan terhadap point cloud hasil akuisisi Mobile LiDAR SLAM untuk menghasilkan model 3D fasad bangunan. Tahapan pengolahan meliputi konversi format data ke LAS, filtering dan registrasi point cloud untuk menghilangkan noise dan menyelaraskan data, rekonstruksi model 3D berbasis point cloud, serta texturing untuk menghasilkan model fasad yang representatif dan realistis.",
    image: "/workflow/processing.jpeg" 
  },
  { 
    title: "3D Modeling", 
    desc: "Pemodelan 3D fasad bangunan dilakukan menggunakan SketchUp Pro 2024 dengan Level of Detail (LoD) 3, berbasis data point cloud hasil Mobile LiDAR SLAM. Point cloud digunakan sebagai acuan pembentukan geometri fasad agar mendekati kondisi eksisting. Model yang dihasilkan kemudian diberi tekstur dan digunakan sebagai dokumentasi serta inventarisasi digital kawasan Titik Nol Kilometer Yogyakarta.",
    image: "/workflow/3d.jpeg" 
  },
  { 
    title: "Uji Akurasi", // Judul diupdate
    desc: "Uji akurasi model 3D dilakukan melalui evaluasi dimensi dan posisi. Akurasi dimensi dinilai dengan membandingkan ukuran geometrik model terhadap data pengukuran lapangan, sedangkan akurasi posisi dianalisis berdasarkan selisih koordinat antara model 3D dan data referensi GPS Geomate untuk menilai ketelitian spasial dalam sistem koordinat yang digunakan.",
    image: "/workflow/akurasi.jpeg",
    points: [
      "Uji akurasi dimensi mengacu pada standar LoD 3",
      "Uji akurasi posisi mengacu pada standar LoD 3"
    ]
  },
  { 
    title: "Visualisasi Web GIS", 
    desc: "Hasil akhir pemodelan dan dokumentasi digital fasad bangunan di kawasan Titik Nol Kilometer Yogyakarta disajikan melalui platform WebGIS interaktif berbasis data Mobile LiDAR SLAM untuk mendukung pemantauan dan perencanaan pengelolaan kawasan.",
    image: "/workflow/visualisasi.jpeg" 
  },
];

const equipments = [
  { 
    title: "Receiver GPS Geodetik (Geomate SG7)", 
    desc: "Receiver GPS Geodetik Geomate SG7 digunakan sebagai data koordinat dalam proses akuisisi. Perangkat ini berfungsi untuk memperoleh koordinat titik kontrol atau titik uji di lapangan dengan ketelitian tinggi, yang selanjutnya digunakan untuk uji akurasi posisi model 3D fasad bangunan hasil Mobile LiDAR SLAM.", 
    img: "/alat/receiver.jpeg" 
  },
  { 
    title: "LiDAR SLAM GS100G", 
    desc: "Perangkat LiDAR SLAM GS-100G berfungsi untuk melakukan akuisisi data point cloud 3D fasad bangunan secara mobile dengan cara menyusuri koridor Jalan Malioboro hingga Titik Nol Kilometer Yogyakarta. Teknologi SLAM memungkinkan pemetaan tetap berlangsung meskipun sinyal GNSS terbatas, sehingga geometri fasad bangunan dapat direkam secara cepat, detail, dan kontinu pada kawasan perkotaan yang padat aktivitas.", 
    img: "/alat/lidar.jpeg" 
  },
];

const streetProduct = {
  name: "Koridor Jalan Malioboro",
  desc: "Jalan Malioboro–Margo Mulyo–Titik Nol Kilometer Yogyakarta merupakan jalur utama kota yang berkembang sejak berdirinya Keraton Yogyakarta. Kawasan ini menjadi pusat aktivitas perdagangan, pemerintahan, dan ruang publik, serta hingga kini dikenal sebagai kawasan bersejarah di pusat Kota Yogyakarta.",
  images: ["/koridor/kthumb.jpeg", "/koridor/kcontent2.jpeg", "/koridor/kcontent3.jpeg", "/koridor/kcontent4.jpeg", "/koridor/kcontent5.jpeg", "/koridor/kcontent6.jpeg" ]
};

const fullLatarBelakang = [
  "Jalan Malioboro merupakan salah satu jalan terpadat yang terdapat pada wilayah Kota Yogyakarta karena jalan ini dapat disebut sebagai pusat pariwisata dan jantung perekonomian Kota Yogyakarta. Terdapat banyak bangunan bersejarah yang menjadi simbol budaya Yogyakarta yang terletak pada jalan ini. Keunikan fasad bangunannya yang khas menjadikan wilayah ini menjadi kawasan warisan budaya. Akan tetapi, banyak tantangan yang dihadapi, seperti kurangnya dokumentasi digital yang akurat dan presisi untuk keperluan konservasi dan tata kelola yang berkelanjutan. Dokumentasi secara 2D saat ini dinilai sudah kurang relevan karena tidak dapat mendokumentasikan geometri 3D yang dapat merekam kondisi fasad. Keterbatasan data ini sangat beresiko menyebabkan hilangnya detail detail berharga, ketidakakuratan dan ketidakpresisian pengukuran.",
  "Pada era-modern sekarang banyak teknologi yang ditawarkan untuk membuat tiga dimensi (3D) suatu bangunan, salah satu teknologi yang ditawarkan adalah LiDAR (Light Detection and Ranging). Kelebihan yang ditawarkan dari teknologi tersebut seperti kecepatan pengambilan data yang tinggi, tingkat akurasi yang baik, lebih efektif dan lebih efisien, mampu mengukur pada objek - objek yang rumit dan kenampakan data hasil pengukuran yang mendekati dengan objek aslinya (Pflipsen, 2006).",
  "LiDAR (Light Detection and Ranging) yang dipadukan dengan algoritma SLAM (Simultaneous Localization and Mapping) merupakan salah satu solusi yang dapat digunakan saat ini. Metode survei terestris secara konvensional menggunakan TLS (Terrestrial Laser Scanner) sering terkendala dengan obstruksi yang ada pada Jalan Malioboro, seperti pejalan kaki dan arus lalu lintas yang padat akan mempersulit proses pengukuran dan memperlama waktunya. LiDAR SLAM dapat dimanfaatkan untuk melakukan akuisisi data 3D dengan cepat dan resolusi tinggi secara mobile. Surveyor dapat membawa perangkat yang sudah terintegrasi dengan sensor LiDAR berjalan di sepanjang titik nol km Yogyakarta dengan memindai seluruh lingkungan sekitar secara real-time. Teknologi SLAM dapat membuat peta lingkungan dalam bentuk point cloud dan menghasilkan data yang sangat akurat."
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

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
              <img src="/latbel/latbel.jpg" alt="Suasana Malioboro" className="rounded-lg shadow-xl" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-orange-600 font-bold tracking-wider mb-2">LATAR BELAKANG</h3>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Mengapa Malioboro Perlu Didigitalkan?</h2>
              
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Jalan Malioboro merupakan pusat pariwisata dan aktivitas ekonomi Kota Yogyakarta yang memiliki banyak bangunan bersejarah dengan fasad khas sebagai kawasan warisan budaya. Namun, dokumentasi digital yang ada masih terbatas pada data 2D sehingga belum mampu merekam geometri fasad secara akurat dan presisi. Pemanfaatan teknologi Mobile LiDAR berbasis SLAM menjadi solusi untuk menghasilkan dokumentasi 3D fasad bangunan secara cepat, detail, dan efisien di kawasan padat aktivitas seperti Titik Nol Kilometer Yogyakarta.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                Proyek ini memanfaatkan teknologi <strong>LiDAR SLAM</strong> untuk akuisisi data 3D spasial yang cepat dan akurat demi keperluan manajemen aset dan pelestarian cagar budaya.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-900">
                  <h4 className="font-bold text-blue-900">Akurasi Tinggi</h4>
                  <p className="text-sm text-gray-500">Data geometri presisi sentimeter.</p>
                </div> */}
                {/* <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <h4 className="font-bold text-blue-900">Efisiensi Waktu</h4>
                  <p className="text-sm text-gray-500">Akuisisi cepat metode mobile scanning.</p>
                </div> */}
              </div>

              <button 
                onClick={() => setIsAboutModalOpen(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-bold transition flex items-center gap-2 shadow-lg"
              >
                Baca Latar Belakang Lengkap <ArrowRight size={18} />
              </button>

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
            {/* Garis Vertikal Tengah */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0"></div>
            
            <div className="space-y-16 md:space-y-24">
              {workflows.map((step, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}>
                  
                  {/* SISI A: KONTEN (GAMBAR + TEKS) */}
                  <div className="flex-1 w-full md:w-1/2 p-2 z-10"> 
                    <div className={`bg-white p-6 rounded-xl shadow-lg border-t-4 ${index % 2 === 0 ? 'border-blue-900' : 'border-orange-600'} relative overflow-hidden hover:-translate-y-2 transition duration-300 group`}>
                      
                      {/* Background Number */}
                      <span className={`text-7xl font-bold text-slate-100 absolute top-0 z-0 select-none pointer-events-none ${index % 2 === 0 ? 'left-4' : 'right-4'}`}>{index + 1}</span>

                      {/* 1. GAMBAR (POSISI DI ATAS) */}
                      <div className="relative z-10 w-full h-56 md:h-64 mb-6 rounded-lg overflow-hidden shadow-sm border-b">
                           <img 
                             src={step.image} 
                             alt={step.title} 
                             className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" 
                           />
                      </div>

                      {/* 2. TEKS (POSISI DI BAWAH GAMBAR) */}
                      <div className={`relative z-10 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center`}>
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                        
                        {/* 3. POIN-POIN (JIKA ADA) */}
                        {/* @ts-ignore - menonaktifkan warning typescript untuk properti points yang opsional */}
                        {step.points && (
                          <ul className={`text-sm text-blue-900 font-semibold space-y-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} inline-block`}>
                            {/* @ts-ignore */}
                            {step.points.map((point, i) => (
                              <li key={i}>• {point}</li>
                            ))}
                          </ul>
                        )}

                      </div>

                    </div>
                  </div>

                  {/* TENGAH: DOT INDIKATOR */}
                  <div className="relative flex items-center justify-center w-8 md:w-12 flex-shrink-0 z-20">
                     <div className="w-4 h-4 bg-blue-900 rounded-full border-4 border-white shadow-md"></div>
                  </div>

                  {/* SISI B: PENYEIMBANG KOSONG */}
                  <div className="flex-1 w-full md:w-1/2 p-2 hidden md:block pointer-events-none">
                     {/* Div kosong untuk menjaga struktur zigzag timeline */}
                  </div>

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
            <h2 className="text-3xl font-bold text-white">Model 3D Bangunan</h2>
            {/* <p className="text-gray-400 mt-4">Hasil rekonstruksi digital dari data point cloud menjadi model 3D bertekstur.</p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
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

          <div className="mt-8">
            <div className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 w-full">
              
              <div className="relative overflow-hidden w-full h-64 md:h-80">
                <img 
                  src={streetProduct.images[0]} 
                  alt={streetProduct.name} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700" 
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => openModal(streetProduct)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg"
                  >
                    Lihat Detail Koridor
                  </button>
                </div>
              </div>

              <div className="p-8 border-t border-slate-700 bg-slate-800/50 backdrop-blur">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-orange-500">{streetProduct.name}</h4>
                    <p className="text-gray-300 text-base max-w-3xl">{streetProduct.desc}</p>
                  </div>
                  <div className="hidden md:block text-orange-600">
                    <ArrowRight size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- MODAL POPUP COMPONENT --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>

          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative z-10 flex flex-col md:flex-row animate-fadeIn">
            
            <div className="w-full md:w-2/3 relative h-64 md:h-[500px] bg-gray-100">
              <img 
                src={selectedProduct.images[currentImageIndex]} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
              
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

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-xs backdrop-blur-sm">
                {selectedProduct.images.length === 2 ? (
                   currentImageIndex === 0 ? "Foto Asli" : "Model SketchUp"
                ) : (
                   `Galeri (${currentImageIndex + 1} / ${selectedProduct.images.length})`
                )}
              </div>
            </div>

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
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* --- MODAL POPUP LATAR BELAKANG --- */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsAboutModalOpen(false)}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative z-10 flex flex-col animate-fadeIn max-h-[90vh]">
            
            <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-blue-900">Latar Belakang Proyek</h3>
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="text-gray-400 hover:text-red-500 transition bg-white p-2 rounded-full shadow-sm"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="prose prose-blue max-w-none text-gray-700 text-justify">
                {fullLatarBelakang.map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-slate-50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
              >
                Tutup
              </button>
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
                <img src="/kegiatan/k4.jpeg" alt="Kegiatan 1" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/kegiatan/k2.jpeg" alt="Kegiatan 2" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/kegiatan/k3.jpeg" alt="Kegiatan 3" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="col-span-2 relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/kegiatan/k1.jpeg" alt="Kegiatan 4" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="col-span-2 relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/kegiatan/k5.jpeg" alt="Kegiatan 4" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
            </div>
            <div className="col-span-2 relative h-32 md:h-48 rounded-lg overflow-hidden">
                <img src="/kegiatan/k6.jpeg" alt="Kegiatan 4" className="w-full h-full object-cover hover:scale-105 transition duration-500"/>
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
            <p className="text-blue-200 text-sm mt-1">PRGG - Kelompok 18.</p>
          </div>
          <div className="text-sm text-blue-300">
            &copy; {new Date().getFullYear()} Teknik Geodesi
          </div>
        </div>
      </footer>
    </div>
  );
}