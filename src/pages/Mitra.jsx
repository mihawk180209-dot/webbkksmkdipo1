import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Handshake,
  Building2,
  Users,
  FileCheck,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  Briefcase,
  ArrowUpRight,
  PlusCircle,
  Globe,
} from "lucide-react";

const Mitra = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("mitra")
        .select("id, nama_mitra, logo_url")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      setPartners(data || []);
    } catch (error) {
      console.error("Gagal ambil mitra:", error);
    } finally {
      setLoading(false);
    }
  };

  // Static data for collaboration types
  const collaborationTypes = [
    {
      title: "Rekrutmen & Penyaluran",
      desc: "Akses prioritas ke database alumni terbaik kami untuk mengisi kebutuhan tenaga kerja perusahaan.",
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Praktek Kerja Industri (Prakerin)",
      desc: "Program magang terstruktur bagi siswa kelas XI/XII selama 3-6 bulan dengan monitoring berkala.",
      icon: Briefcase,
      color: "bg-violet-50 text-violet-600 border-violet-100",
    },
    {
      title: "Kelas Industri & Guru Tamu",
      desc: "Praktisi industri berbagi ilmu langsung di kelas untuk update teknologi terkini sesuai standar DUDI.",
      icon: Building2,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      title: "Sinkronisasi Kurikulum",
      desc: "Penyelarasan materi ajar sekolah dengan standar kompetensi yang dibutuhkan industri masa kini.",
      icon: FileCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-violet-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg">
            <Handshake size={14} className="text-amber-400" />
            <span>Partner Industri Resmi</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Sinergi Membangun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Generasi Kompeten
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Berkolaborasi dengan ratusan pemimpin industri untuk menyelaraskan
            kurikulum, meningkatkan kompetensi, dan menyalurkan tenaga kerja
            profesional siap kerja.
          </p>
        </div>
      </section>

      {/* 2. PARTNER LOGO GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Dipercaya Oleh Industri
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              Kami bangga dapat bekerjasama dengan perusahaan-perusahaan terbaik
              untuk menjamin kualitas lulusan.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-slate-50 rounded-2xl animate-pulse border border-slate-100"
                  ></div>
                ))
              : partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Logo Container */}
                    <div className="w-full h-24 mb-4 flex items-center justify-center relative z-10">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.nama_mitra}
                          className="w-full h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-violet-500 transition-colors">
                          <Building2 size={32} />
                        </div>
                      )}
                    </div>

                    {/* Partner Name */}
                    <h3 className="text-sm font-semibold text-slate-600 group-hover:text-violet-700 transition-colors line-clamp-2 relative z-10">
                      {partner.nama_mitra}
                    </h3>
                  </div>
                ))}

            {/* "Join Us" Card mixed into the grid */}
            <div className="group bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-violet-900 transition-colors duration-300 cursor-pointer border border-slate-800">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <PlusCircle size={24} />
              </div>
              <h3 className="text-white font-bold mb-2">Jadilah Mitra Kami</h3>
              <p className="text-slate-400 text-xs mb-4">
                Bergabung dengan jaringan industri kami
              </p>
              <span className="text-violet-300 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors flex items-center gap-1">
                Hubungi Kami <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COLLABORATION TYPES */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            {/* Sticky Sidebar */}
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-100 text-violet-700 text-xs font-bold uppercase mb-6 tracking-wide">
                <Sparkles size={14} /> Kolaborasi
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Bentuk Sinergi <br />
                <span className="text-violet-600">Sekolah & Industri</span>
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Kami menawarkan berbagai skema kerjasama yang fleksibel dan
                saling menguntungkan untuk mendukung kebutuhan SDM dan CSR
                perusahaan Anda.
              </p>

              <button className="px-6 py-3.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center gap-2 group">
                Pelajari Proposal{" "}
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>

            {/* List Items */}
            <div className="lg:w-7/12 grid gap-6">
              {collaborationTypes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}
                  >
                    <item.icon size={26} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 container mx-auto px-6">
        <div className="relative rounded-[2rem] bg-slate-900 p-10 md:p-20 overflow-hidden text-center shadow-2xl shadow-slate-900/20">
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600 rounded-full blur-[120px] opacity-30 translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Siap Menjadi Mitra Kami?
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed font-light">
              Hubungi tim Humas BKK SMK Diponegoro 1 untuk mendiskusikan peluang
              kerjasama yang dapat memajukan industri dan pendidikan vokasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-white/5">
                <Mail size={20} className="text-violet-600" /> Kirim Email
              </button>
              <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                <Phone size={20} /> WhatsApp Kami
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mitra;
