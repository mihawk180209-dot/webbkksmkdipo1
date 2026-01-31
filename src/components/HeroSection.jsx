import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  BookOpen,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const HeroSection = () => {
  const cards = [
    {
      icon: Briefcase,
      title: "Lowongan Kerja",
      desc: "Temukan karir impian di berbagai perusahaan mitra terpercaya kami.",
      // Violet Theme
      iconColor: "text-violet-600 group-hover:text-white",
      iconBg: "bg-violet-50 group-hover:bg-violet-600",
      borderColor: "hover:border-violet-200",
      link: "/lowongan",
    },
    {
      icon: BookOpen,
      title: "Program Pelatihan",
      desc: "Tingkatkan kompetensi melalui workshop dan sertifikasi industri.",
      // Pink Theme
      iconColor: "text-pink-600 group-hover:text-white",
      iconBg: "bg-pink-50 group-hover:bg-pink-600",
      borderColor: "hover:border-pink-200",
      link: "/pelatihan",
    },
    {
      icon: Calendar,
      title: "Event & Job Fair",
      desc: "Informasi jadwal rekrutmen massal dan seminar pengembangan karir.",
      // Amber Theme
      iconColor: "text-amber-600 group-hover:text-white",
      iconBg: "bg-amber-50 group-hover:bg-amber-600",
      borderColor: "hover:border-amber-200",
      link: "/kegiatan",
    },
  ];

  return (
    <div className="relative bg-slate-50 font-sans">
      {/* --- HERO BACKGROUND AREA --- */}
      <section className="relative pt-20 pb-48 lg:pt-32 lg:pb-64 overflow-hidden">
        {/* Dark Base Background */}
        <div className="absolute inset-0 bg-slate-900"></div>

        {/* Ambient Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="relative container mx-auto px-6 text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-200 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md shadow-lg">
            <Sparkles size={14} className="text-yellow-400" />
            <span>Pusat Karir & Alumni Terintegrasi</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Raih Masa Depan Gemilang <br className="hidden md:block" />
            Bersama{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              BKK SMK Diponegoro 1
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed font-light">
            Platform resmi yang menghubungkan alumni dan siswa dengan ratusan
            peluang karir profesional di dunia industri dan usaha.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/lowongan"
              className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 flex items-center justify-center gap-2"
            >
              Cari Lowongan
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/profil"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all backdrop-blur-sm flex items-center justify-center"
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </section>

      {/* --- OVERLAPPING CARDS SECTION --- */}
      <section className="relative container mx-auto px-6 -mt-32 pb-24 z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                to={card.link}
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 ${card.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${card.iconBg}`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-300 ${card.iconColor}`}
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <ArrowRight
                      size={14}
                      className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-violet-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
