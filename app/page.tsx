"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, MapPin, Layers, Camera, Database, Users, ArrowRight } from 'lucide-react';

// --- DATA DARI PDF ANDA ---

const teamMembers = [
  { name: "Dr. Ir. Catur Aries Rokhmana, S.T., M.T.", nim: "Dosen Pembimbing", role: "Supervisor" },
  { name: "Rizal Ahmad Fahreza", nim: "22/505334/TK/55290", role: "Surveyor & Processing" },
  { name: "Fatma Rizqiamurti", nim: "22/504906/TK/55236", role: "Surveyor & Processing" },
  { name: "Arina", nim: "NIM menyesuaikan", role: "Team Member" }, // Tambahkan NIM lengkap jika ada
  { name: "Abil Pilar Surastu", nim: "22/504138/TK/55123", role: "Team Member" },
  { name: "Zahra Nico Fadla", nim: "22/503974/TK/55102", role: "Team Member" },
  { name: "Alif Zacky Gunawan", nim: "22/497524/TK/54529", role: "Team Member" },
];

const products = [
  { name: "Gedung BNI 46", desc: "Model 3D detail fasad bangunan heritage BNI.", img: "/bangunan/bni.jpeg" },
  { name: "Pasar Beringharjo", desc: "Dokumentasi digital pasar bersejarah Yogyakarta.", img: "/bangunan/pasar.jpeg" },
  { name: "Gereja Kawasan Malioboro", desc: "Pemodelan arsitektur religius di kawasan nol km.", img: "/bangunan/gereja.jpeg" },
  { name: "Kantor Pos Besar", desc: "Detail geometri bangunan Kantor Pos titik nol.", img: "/bangunan/kantor-pos.jpeg" },
  { name: "Teras Malioboro", desc: "Pemetaan kawasan pedestrian dan UMKM.", img: "/bangunan/teras.jpeg" },
  { name: "Toko Hamzah Batik", desc: "Model fasad bangunan komersial ikonik.", img: "/bangunan/hamzah.jpeg" },
];

const workflows = [
  { title: "Studi Literatur & Survei", desc: "Studi pendahuluan dan survei awal lokasi sepanjang Malioboro - Titik Nol KM." },
  { title: "Akuisisi Data", desc: "Pengambilan data lapangan menggunakan Mobile LiDAR SLAM untuk menangkap geometri kompleks." },
  { title: "Processing Point Cloud", desc: "Registrasi dan filtering data mentah (format .LAS) menggunakan Cloud Compare." },
  { title: "3D Modeling", desc: "Rekonstruksi model fasad bangunan menggunakan perangkat lunak SketchUp." },
  { title: "Analisis & Integrasi", desc: "Analisis akurasi geometri dan penggabungan model tekstur." },
];

// --- KOMPONEN UTAMA ---

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">GEODESI<span className="text-orange-600">UGM</span></div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            {['Home', 'About', 'Equipment', 'Workflow', 'Product', 'Documentation', 'Team'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-blue-900 transition">
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
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
        {/* Ganti src dengan foto Malioboro Point Cloud Anda */}
        <div className="absolute inset-0 overflow-hidden">
          <img src="/api/placeholder/1920/1080" alt="Background Point Cloud" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative container mx-auto px-6 text-center z-10">
          <h2 className="text-orange-500 font-bold tracking-widest mb-4">DIGITAL TWIN HERITAGE</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Pemodelan 3D Fasad<br />Jalan Malioboro - Titik Nol KM
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Inventarisasi Kawasan Warisan Budaya Menggunakan Teknologi Mobile LiDAR SLAM untuk Dokumentasi Presisi Tinggi.
          </p>
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
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-900">
                <Camera size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Mobile LiDAR SLAM</h4>
              <p className="text-gray-500 text-sm">Alat akuisisi data utama untuk menangkap point cloud lingkungan secara real-time sambil bergerak.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
                <Database size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">Processing Workstation</h4>
              <p className="text-gray-500 text-sm">Perangkat komputasi spek tinggi untuk registrasi point cloud, filtering, dan rendering model.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-900">
                <MapPin size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">GNSS Receiver</h4>
              <p className="text-gray-500 text-sm">Digunakan untuk georeferensi agar model memiliki koordinat spasial global yang akurat.</p>
            </div>
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
            {/* Vertical Line */}
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

      {/* PRODUCT SECTION */}
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
                   {/* Ganti src ini dengan gambar hasil model 3D Anda */}
                  <img src={item.img} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold">Lihat Detail</button>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTATION SECTION */}
      <section id="documentation" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-orange-600 font-bold tracking-wider mb-2">DOKUMENTASI</h3>
            <h2 className="text-3xl font-bold text-blue-900">Galeri Kegiatan Lapangan</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Grid Galeri Masonry Style Sederhana */}
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border-t-4 border-transparent hover:border-blue-900">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={`/api/placeholder/150/150?text=${member.name.charAt(0)}`} alt={member.name} className="w-full h-full object-cover" />
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