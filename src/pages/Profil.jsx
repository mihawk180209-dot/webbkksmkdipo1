import React from "react";
import {
  Target,
  CheckCircle2,
  Users,
  Award,
  Briefcase,
  Sparkles,
  Quote,
  Building2,
  GraduationCap,
} from "lucide-react";
// Ensure these paths match your project structure
import fotoKepsek from "../assets/Bu Ipeh.jpg";
import bkk from "../assets/Pak Rian.jpg";

const Profil = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative bg-slate-950 pt-32 pb-40 overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg">
            <Sparkles size={14} className="text-amber-400" />
            <span>Tentang Kami</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Membangun Jembatan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">
              Menuju Masa Depan Karir
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            BKK SMK Diponegoro 1 Jakarta berkomitmen menyalurkan talenta terbaik
            lulusan ke dunia industri global melalui sistem yang terintegrasi
            dan profesional.
          </p>
        </div>
      </section>

      {/* ================= 2. COMPANY PROFILE & OVERVIEW ================= */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Component */}
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src="https://img.freepik.com/free-photo/group-business-workers-smiling-happy-confident-working-together-with-smile-face-office_8353-6333.jpg"
                alt="Tim Profesional BKK"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />

              {/* Stat Badge */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-xl border border-slate-100 text-center min-w-[140px]">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Est. Since
                </p>
                <p className="text-3xl font-extrabold text-indigo-600">2010</p>
              </div>
            </div>
          </div>

          {/* Content Component */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Mitra Strategis <br />
              <span className="text-indigo-600">
                Dunia Pendidikan & Industri
              </span>
            </h2>

            <div className="prose prose-lg text-slate-600 mb-10 leading-relaxed text-justify">
              <p>
                Bursa Kerja Khusus (BKK) SMK Diponegoro 1 Jakarta adalah unit
                pelaksana teknis yang dibentuk sebagai jembatan strategis antara
                lulusan SMK dengan dunia kerja. Kami bermitra resmi dengan Dinas
                Tenaga Kerja untuk memberikan layanan informasi lowongan,
                pelatihan kompetensi, hingga penempatan kerja yang akurat dan
                transparan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <Award size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Akreditasi
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-900">Grade A</p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                    <Building2 size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Mitra DUDI
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-900">
                  50+ Perusahaan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. VISION & MISSION ================= */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card (Dark Theme) */}
            <div className="bg-slate-900 rounded-3xl p-10 md:p-12 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden flex flex-col justify-center">
              {/* Background Texture */}
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Target size={200} />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-900/50">
                  <Target size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight">
                  Visi Kami
                </h3>
                <div className="relative pl-6 border-l-2 border-indigo-500">
                  <Quote className="absolute -top-4 -left-9 text-indigo-500 w-6 h-6 rotate-180 opacity-50" />
                  <p className="text-slate-300 leading-relaxed text-lg italic">
                    "Menjadi Bursa Kerja Khusus yang profesional, terpercaya,
                    dan mampu menyalurkan tamatan SMK Diponegoro 1 Jakarta ke
                    dunia kerja secara optimal, serta mencetak wirausahawan muda
                    yang mandiri."
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card (Light Theme) */}

            <div className="bg-slate-50 rounded-3xl p-10 md:p-12 border border-slate-200 shadow-sm relative">
              <div className="w-12 h-12 bg-white border border-slate-200 text-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Misi Strategis
              </h3>
              <ul className="space-y-4">
                {[
                  "Pelayanan informasi pasar kerja yang aktual & relevan.",
                  "Peningkatan kompetensi hard-skill & soft-skill lulusan.",
                  "Perluasan kerjasama (MoU) dengan Dunia Usaha & Industri.",
                  "Penanaman jiwa kewirausahaan (Entrepreneurship).",
                  "Pelaksanaan Tracer Study (penelusuran alumni) berkala.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-slate-700 group"
                  >
                    <div className="mt-1 shrink-0">
                      <CheckCircle2 size={18} className="text-indigo-500" />
                    </div>
                    <span className="leading-relaxed font-medium text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. CORE SERVICES (Bento Style) ================= */}
      <section className="py-24 container mx-auto px-6 bg-slate-50">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Fokus & Layanan Utama
          </h2>
          <p className="text-slate-500 text-lg font-light">
            Tiga pilar utama layanan kami dalam mendukung kesuksesan karir
            setiap siswa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Briefcase,
              color: "bg-indigo-50 text-indigo-600",
              title: "Penyaluran Kerja",
              desc: "Memfasilitasi lulusan untuk mendapatkan pekerjaan yang sesuai kompetensi keahlian melalui seleksi yang transparan.",
            },
            {
              icon: Building2,
              color: "bg-pink-50 text-pink-600",
              title: "Kemitraan Industri",
              desc: "Membangun ekosistem kerjasama strategis dengan perusahaan bonafit (DUDI) untuk sinkronisasi kurikulum.",
            },
            {
              icon: Users,
              color: "bg-amber-50 text-amber-600",
              title: "Pengembangan Karakter",
              desc: "Membekali siswa dengan etika kerja, budaya industri, dan soft-skill untuk kesiapan mental di tempat kerja.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${item.color}`}
              >
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                {item.title}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. ORGANIZATIONAL STRUCTURE ================= */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <span className="text-indigo-600 font-bold tracking-wider uppercase text-xs mb-3 block">
            Tim Manajemen
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-16">
            Struktur Organisasi
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            {/* Card: Kepala Sekolah */}
            <div className="group w-64">
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-slate-200 group-hover:border-indigo-500 transition-colors duration-300"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={fotoKepsek}
                    alt="Kepala Sekolah"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Nurlathifah, M.Pd.Gr
              </h3>
              <p className="text-slate-500 text-sm mt-1">Kepala Sekolah</p>
            </div>

            {/* Card: Ketua BKK */}
            <div className="group w-64">
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-slate-200 group-hover:border-indigo-500 transition-colors duration-300"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={bkk}
                    alt="Ketua BKK"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Rian Hidayat, M.Pd
              </h3>
              <p className="text-slate-500 text-sm mt-1">Ketua BKK</p>
            </div>

            {/* Card: Staff Hubin */}
            <div className="group w-64">
              <div className="relative mb-6 mx-auto w-48 h-48">
                <div className="absolute inset-0 rounded-full border border-slate-200 group-hover:border-indigo-500 transition-colors duration-300"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg">
                  <img
                    src={bkk}
                    alt="Hubungan Industri"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Rian Hidayat, M.Pd
              </h3>
              <p className="text-slate-500 text-sm mt-1">Hubungan Industri</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profil;
