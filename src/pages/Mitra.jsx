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
} from "lucide-react";

const Mitra = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mitra")
      .select("id, nama_mitra, logo_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil mitra:", error);
    } else {
      setPartners(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Handshake size={14} className="text-amber-400" />
            Partner Industri Resmi
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Sinergi Membangun <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Generasi Kompeten
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Berkolaborasi dengan ratusan pemimpin industri untuk menyelaraskan
            kurikulum, meningkatkan kompetensi, dan menyalurkan tenaga kerja
            profesional.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/10 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">
                {loading ? "..." : partners.length + "+"}
              </p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                Mitra Aktif
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">90%</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                Serapan Alumni
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">10+</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                Tahun Pengalaman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGO GRID (LAYOUT DIPERBESAR & LEBIH RAPI) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Dipercaya Oleh Industri
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Kami bangga dapat bekerjasama dengan perusahaan-perusahaan terbaik
              di Indonesia.
            </p>
          </div>

          {/* Grid Layout: Menggunakan 2 kolom di HP, 3 di tablet, 4 di Desktop agar Card lebih Besar */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-slate-50 rounded-3xl animate-pulse border border-slate-100"
                  ></div>
                ))
              : partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:shadow-violet-100/50 hover:border-violet-100 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                  >
                    {/* Background decoration on hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Container Logo (Lebih Besar) */}
                    <div className="w-full h-32 mb-6 flex items-center justify-center relative z-10">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.nama_mitra}
                          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-violet-500 transition-colors">
                          <Building2 size={48} />
                        </div>
                      )}
                    </div>

                    {/* Nama Mitra (Selalu Muncul & Styling Jelas) */}
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover:text-violet-700 transition-colors line-clamp-2 relative z-10">
                      {partner.nama_mitra}
                    </h3>
                  </div>
                ))}
          </div>

          {/* BUTTON GABUNG MITRA (DIPINDAH KE BAWAH LOGO & DIBUAT MENONJOL) */}
          <div className="mt-16 text-center">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
              <span className="mr-2">Ingin Menjadi Mitra Kami?</span>
              <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute -inset-3 rounded-full bg-violet-400 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-200" />
            </button>
            <p className="mt-4 text-sm text-slate-400 font-medium">
              Bergabunglah dengan jaringan industri SMK Diponegoro 1
            </p>
          </div>
        </div>
      </section>

      {/* 3. BENTUK KERJASAMA */}
      <section className="py-24 bg-[#F8FAFC] border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase mb-6">
                <Sparkles size={14} /> Kolaborasi
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Bentuk Sinergi <br />
                <span className="text-violet-600">Sekolah & Industri</span>
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Kami menawarkan berbagai skema kerjasama yang fleksibel dan
                saling menguntungkan untuk mendukung kebutuhan SDM perusahaan
                Anda.
              </p>

              <button className="px-8 py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 flex items-center gap-2">
                Pelajari Proposal <ArrowUpRight size={20} />
              </button>
            </div>

            <div className="lg:w-7/12 grid gap-6">
              {[
                {
                  title: "Rekrutmen & Penyaluran",
                  desc: "Akses prioritas ke database alumni terbaik kami untuk mengisi kebutuhan tenaga kerja perusahaan.",
                  icon: Users,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "Praktek Kerja Industri (Prakerin)",
                  desc: "Program magang terstruktur bagi siswa kelas XI/XII selama 3-6 bulan.",
                  icon: Briefcase,
                  color: "bg-violet-100 text-violet-600",
                },
                {
                  title: "Kelas Industri & Guru Tamu",
                  desc: "Praktisi industri berbagi ilmu langsung di kelas untuk update teknologi terkini.",
                  icon: Building2,
                  color: "bg-amber-100 text-amber-600",
                },
                {
                  title: "Sinkronisasi Kurikulum",
                  desc: "Penyelarasan materi ajar sekolah dengan standar kompetensi yang dibutuhkan industri.",
                  icon: FileCheck,
                  color: "bg-green-100 text-green-600",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <item.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="relative rounded-[2.5rem] bg-slate-900 p-10 md:p-20 overflow-hidden text-center shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Siap Menjadi Mitra Kami?
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              Hubungi tim Humas BKK SMK Diponegoro 1 untuk mendiskusikan peluang
              kerjasama yang dapat memajukan industri dan pendidikan vokasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Mail size={20} /> Kirim Email
              </button>
              <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
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
