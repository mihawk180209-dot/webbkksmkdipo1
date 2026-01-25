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
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [latestEvents, setLatestEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA KEGIATAN TERBARU ---
  useEffect(() => {
    fetchLatestEvents();
  }, []);

  const fetchLatestEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .order("tanggal_event", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setLatestEvents(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* ================= 1. HERO SECTION (Dark Premium) ================= */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 overflow-hidden bg-slate-950">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md animate-fade-in-up">
            <Sparkles size={12} className="text-amber-400" />
            Portal Karir Resmi
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Jembatan Menuju <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              Masa Depan Profesional
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Platform terintegrasi BKK SMK Diponegoro 1 Jakarta untuk
            menghubungkan talenta siswa dengan peluang industri global.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/lowongan")}
              className="w-full sm:w-auto px-8 py-4 bg-violet-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-violet-600/25 hover:bg-violet-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Briefcase size={20} />
              Cari Lowongan
            </button>
            <button
              onClick={() => navigate("/profil")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              Tentang Kami
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. FEATURE CARDS (Floating) ================= */}
      <section className="container mx-auto px-6 relative z-20 -mt-20 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            onClick={() => navigate("/lowongan")}
            className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-6 relative z-10 group-hover:bg-violet-600 group-hover:text-white transition-colors">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">
              Bursa Kerja (Loker)
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 relative z-10">
              Akses ribuan informasi lowongan kerja terverifikasi dari mitra
              industri kami.
            </p>
            <span className="text-violet-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Telusuri <ArrowRight size={16} />
            </span>
          </div>

          {/* Card 2 */}
          <div className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 relative z-10 group-hover:bg-pink-600 group-hover:text-white transition-colors">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">
              Diklat & Sertifikasi
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 relative z-10">
              Program pelatihan soft-skill dan hard-skill untuk persiapan dunia
              kerja.
            </p>
            <span className="text-pink-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Lihat Program <ArrowRight size={16} />
            </span>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate("/kegiatan")}
            className="group bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 relative z-10 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Target size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">
              Event & Career Day
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 relative z-10">
              Jangan lewatkan Job Fair tahunan dan seminar karir eksklusif.
            </p>
            <span className="text-amber-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Cek Jadwal <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </section>

      {/* ================= 3. STATS SECTION ================= */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-20 blur-lg rotate-2"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" // High Quality Professional Image
                alt="Collaboration"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[400px]"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Terakreditasi
                  </p>
                  <p className="font-bold text-slate-800">Sangat Baik</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Membangun Generasi <br />
                <span className="text-violet-600">Kompeten & Siap Kerja</span>
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                Kami berkomitmen menjadi jembatan strategis antara dunia
                pendidikan dan industri, memastikan setiap lulusan memiliki
                kompetensi yang dibutuhkan pasar global.
              </p>

              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {[
                  { count: "10+", label: "Mitra Industri", icon: Building2 },
                  { count: "20+", label: "Program Pelatihan", icon: BookOpen },
                  { count: "500+", label: "Alumni Terserap", icon: Users },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-violet-200 transition-colors"
                  >
                    <stat.icon className="text-violet-600 mb-2" size={24} />
                    <h4 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1">
                      {stat.count}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. KEGIATAN TERBARU (Dynamic) ================= */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-violet-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                Update Terbaru
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Agenda & Kegiatan Sekolah
              </h2>
            </div>
            <button
              onClick={() => navigate("/kegiatan")}
              className="group flex items-center gap-2 text-slate-500 font-semibold hover:text-violet-600 transition-colors"
            >
              Lihat Semua{" "}
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl h-[400px] animate-pulse border border-slate-100"
                ></div>
              ))
            ) : latestEvents.length === 0 ? (
              <div className="col-span-3 py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 font-medium">
                  Belum ada agenda kegiatan terbaru saat ini.
                </p>
              </div>
            ) : (
              latestEvents.map((item) => (
                <Link
                  to={`/kegiatan/${item.id}`}
                  key={item.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-100 border border-slate-100 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
                >
                  {/* Image Container */}
                  <div className="h-56 bg-slate-100 relative overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.nama_event}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-slate-100 text-violet-300">
                        <Calendar size={48} />
                      </div>
                    )}

                    {/* Date Badge Overlay */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-xl px-3 py-2 text-center shadow-lg min-w-[60px]">
                      <span className="block text-xs font-bold text-slate-400 uppercase">
                        {new Date(item.tanggal_event).toLocaleDateString(
                          "id-ID",
                          { month: "short" },
                        )}
                      </span>
                      <span className="block text-xl font-extrabold text-violet-600 leading-none">
                        {new Date(item.tanggal_event).getDate()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {item.nama_event}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2.5 text-sm text-slate-500">
                        <Clock size={16} className="text-violet-400 shrink-0" />
                        <span>
                          {item.jam_mulai
                            ? item.jam_mulai.substring(0, 5)
                            : "08:00"}{" "}
                          WIB
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-500">
                        <MapPin
                          size={16}
                          className="text-violet-400 shrink-0"
                        />
                        <span className="truncate">{item.lokasi}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Detail Event
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
