import React from "react";
import {
  Briefcase,
  BookOpen,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom"; // Gunakan Link jika pakai routing

const HeroSection = () => {
  const cards = [
    {
      icon: Briefcase,
      title: "Lowongan Kerja", // Istilah umum lebih profesional daripada merk "Job Street"
      desc: "Temukan karir impian di perusahaan mitra terpercaya.",
      color: "text-violet-600",
      bg: "bg-violet-50 group-hover:bg-violet-600 group-hover:text-white",
      borderColor: "hover:border-violet-200",
      link: "/lowongan",
    },
    {
      icon: BookOpen,
      title: "Program Pelatihan",
      desc: "Tingkatkan skill dengan workshop dan sertifikasi industri.",
      color: "text-pink-600",
      bg: "bg-pink-50 group-hover:bg-pink-600 group-hover:text-white",
      borderColor: "hover:border-pink-200",
      link: "/pelatihan",
    },
    {
      icon: Calendar,
      title: "Event & Job Fair",
      desc: "Jadwal rekrutmen massal dan seminar karir terbaru.",
      color: "text-amber-600",
      bg: "bg-amber-50 group-hover:bg-amber-600 group-hover:text-white",
      borderColor: "hover:border-amber-200",
      link: "/kegiatan",
    },
  ];

  return (
    <div className="relative bg-slate-50">
      {/* 1. HERO BACKGROUND AREA */}
      <section className="relative pt-20 pb-48 lg:pt-32 lg:pb-64 overflow-hidden">
        {/* Background Base Color */}
        <div className="absolute inset-0 bg-slate-900"></div>

        {/* Background Decorative Elements (Blobs & Gradients) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        {/* Grid Pattern Overlay (Optional but looks cool) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        <div className="relative container mx-auto px-6 text-center z-10">
          {/* Badge Kecil di atas judul */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-violet-200 text-sm font-medium mb-6 backdrop-blur-sm animate-fade-in-up">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Pusat Karir & Alumni Terintegrasi</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Raih Masa Depan Gemilang <br className="hidden md:block" />
            Bersama{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              BKK SMK Diponegoro 1
            </span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Platform resmi yang menghubungkan alumni dan siswa SMK Diponegoro 1
            Jakarta dengan ratusan peluang karir di dunia industri.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/lowongan"
              className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
            >
              Cari Lowongan
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/profil"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all backdrop-blur-sm"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING CARDS SECTION */}
      <section className="relative container mx-auto px-6 -mt-32 pb-24 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 ${card.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center transition-colors duration-300`}
                >
                  <card.icon
                    className={`w-7 h-7 ${card.color} transition-colors duration-300`}
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                  <ArrowRight
                    size={16}
                    className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-violet-700 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
