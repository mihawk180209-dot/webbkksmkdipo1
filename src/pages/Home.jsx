import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Briefcase,
  BookOpen,
  Target,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  Award,
  Sparkles,
  ChevronRight,
  School,
} from "lucide-react";

/**
 * Home Component
 * Main landing page for the BKK SMK Diponegoro 1 Career Portal.
 */
const Home = () => {
  const navigate = useNavigate();
  const [latestEvents, setLatestEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- DATA FETCHING ---
  useEffect(() => {
    fetchLatestEvents();
  }, []);

  const fetchLatestEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("kegiatan")
        .select("*")
        .order("tanggal_event", { ascending: false })
        .limit(3);

      if (error) throw error;
      setLatestEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER HELPERS ---
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("id-ID", { month: "short" }),
      full: date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden bg-slate-950">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-slate-900/50 border border-slate-700/50 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg">
            <School size={14} className="text-indigo-400" />
            <span>BKK SMK Diponegoro 1 Jakarta</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Membangun Karir <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">
              Profesional & Kompeten
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Platform digital terintegrasi yang menghubungkan talenta siswa
            terbaik dengan peluang industri global dan pengembangan kompetensi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/lowongan")}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg shadow-lg shadow-indigo-900/20 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Briefcase size={20} />
              Cari Lowongan
            </button>
            <button
              onClick={() => navigate("/profil")}
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-slate-700 rounded-lg font-semibold text-lg hover:bg-white/5 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. CORE FEATURES (Floating Cards) ================= */}
      <section className="container mx-auto px-6 relative z-20 -mt-24 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Feature: Bursa Kerja */}
          <div
            onClick={() => navigate("/lowongan")}
            className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Bursa Kerja (Loker)
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Akses ribuan informasi lowongan kerja terverifikasi langsung dari
              mitra industri strategis kami.
            </p>
            <span className="text-indigo-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Telusuri Karir <ArrowRight size={16} />
            </span>
          </div>

          {/* Feature: Diklat */}
          <div className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Diklat & Sertifikasi
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Program pelatihan intensif soft-skill dan hard-skill untuk
              mempersiapkan standar kompetensi dunia kerja.
            </p>
            <span className="text-pink-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Lihat Program <ArrowRight size={16} />
            </span>
          </div>

          {/* Feature: Event */}
          <div
            onClick={() => navigate("/kegiatan")}
            className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Event & Career Day
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Informasi mengenai Job Fair tahunan, seminar karir, dan kunjungan
              industri eksklusif.
            </p>
            <span className="text-amber-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Cek Jadwal <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </section>

      {/* ================= 3. STATISTICS & IMPACT ================= */}

      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Visual Side */}
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                  alt="Kolaborasi Siswa dan Industri"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 max-w-xs">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                    Akreditasi
                  </p>
                  <p className="font-bold text-slate-900 text-lg">
                    Sangat Baik (A)
                  </p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Mencetak Generasi <br />
                <span className="text-indigo-600">Unggul & Siap Kerja</span>
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed font-light">
                Kami berkomitmen menjembatani kesenjangan antara kurikulum
                pendidikan dan kebutuhan industri modern, memastikan setiap
                lulusan memiliki kompetensi teknis dan karakter profesional.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { count: "50+", label: "Mitra Industri", icon: Building2 },
                  { count: "20+", label: "Program Diklat", icon: BookOpen },
                  { count: "90%", label: "Tingkat Serapan", icon: Users },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:border-indigo-200"
                  >
                    <stat.icon className="text-indigo-600 mb-2" size={24} />
                    <h4 className="text-2xl font-extrabold text-slate-900">
                      {stat.count}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. LATEST EVENTS ================= */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs mb-2 block">
                Agenda Sekolah
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Kegiatan & Informasi Terbaru
              </h2>
            </div>
            <button
              onClick={() => navigate("/kegiatan")}
              className="group flex items-center gap-2 text-slate-600 font-semibold hover:text-indigo-600 transition-colors text-sm"
            >
              Lihat Semua Agenda
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // Loading Skeleton
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl h-[380px] border border-slate-100 overflow-hidden"
                >
                  <div className="h-48 bg-slate-200 animate-pulse"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : latestEvents.length === 0 ? (
              // Empty State
              <div className="col-span-3 py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Tidak ada agenda
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Belum ada kegiatan terbaru yang dijadwalkan.
                </p>
              </div>
            ) : (
              // Event Cards
              latestEvents.map((item) => {
                const dateData = formatDate(item.tanggal_event);
                return (
                  <Link
                    to={`/kegiatan/${item.id}`}
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                  >
                    {/* Image Header */}
                    <div className="h-48 bg-slate-100 relative overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.nama_event}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300">
                          <School size={40} />
                        </div>
                      )}

                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-md min-w-[55px]">
                        <span className="block text-[10px] font-bold text-slate-500 uppercase">
                          {dateData.month}
                        </span>
                        <span className="block text-lg font-bold text-indigo-600 leading-none">
                          {dateData.day}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {item.nama_event}
                      </h3>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2.5 text-sm text-slate-500">
                          <Clock
                            size={15}
                            className="text-indigo-400 shrink-0"
                          />
                          <span>
                            {item.jam_mulai
                              ? item.jam_mulai.substring(0, 5)
                              : "08:00"}{" "}
                            WIB
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-slate-500">
                          <MapPin
                            size={15}
                            className="text-indigo-400 shrink-0"
                          />
                          <span className="truncate">
                            {item.lokasi || "Sekolah"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Selengkapnya
                        </span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
