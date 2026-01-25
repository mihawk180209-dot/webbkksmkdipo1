import React from "react";
import {
  Target,
  CheckCircle2,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Sparkles,
  Quote,
} from "lucide-react";
import fotoKepsek from "../assets/Bu Ipeh.jpg";
import bkk from "../assets/Pak Rian.jpg";

const Profil = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* ================= 1. HERO SECTION (Dark Premium Theme) ================= */}
      <section className="relative bg-slate-950 pt-32 pb-32 overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={12} className="text-amber-400" />
            Tentang Kami
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Mengenal Lebih Dekat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              BKK SMK Diponegoro 1
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Lembaga resmi penyalur tenaga kerja alumni yang berdedikasi
            menjembatani dunia pendidikan dengan kebutuhan industri global.
          </p>
        </div>
      </section>

      {/* ================= 2. TENTANG KAMI (Modern Layout) ================= */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side with Decoration */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-violet-100 rounded-full z-0 opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-indigo-50 rounded-full z-0 opacity-60"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white">
              <img
                src="https://img.freepik.com/free-photo/group-business-workers-smiling-happy-confident-working-together-with-smile-face-office_8353-6333.jpg"
                alt="Tim BKK"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-slate-100">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Berdiri Sejak
                </p>
                <p className="text-3xl font-extrabold text-violet-600">2010</p>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Mitra Strategis <br />
              <span className="text-violet-600">Dunia Industri</span>
            </h2>

            <div className="prose prose-lg text-slate-600 mb-8 leading-relaxed text-justify">
              <p>
                Bursa Kerja Khusus (BKK) SMK Diponegoro 1 Jakarta adalah unit
                pelaksana teknis yang dibentuk sebagai jembatan strategis antara
                lulusan SMK dengan dunia kerja. Kami bermitra resmi dengan Dinas
                Tenaga Kerja untuk memberikan layanan informasi lowongan,
                pelatihan soft-skill, hingga penempatan kerja.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-3xl font-bold text-slate-900 mb-1">A</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Akreditasi Sekolah
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-3xl font-bold text-slate-900 mb-1">50+</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Mitra Perusahaan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. VISI & MISI (Contrast Cards) ================= */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card Visi (Dark Accent) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
              {/* Decorative Big Icon */}
              <Target className="absolute -right-6 -bottom-6 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-violet-500/30">
                  <Target size={28} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Visi Kami</h3>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-4 text-violet-500/50 w-8 h-8 rotate-180" />
                  <p className="text-slate-300 leading-relaxed text-lg font-light italic pl-4 border-l-2 border-violet-500/50">
                    "Menjadi Bursa Kerja Khusus yang profesional, terpercaya,
                    dan mampu menyalurkan tamatan SMK Diponegoro 1 Jakarta ke
                    dunia kerja secara optimal, serta mencetak wirausahawan muda
                    yang mandiri."
                  </p>
                </div>
              </div>
            </div>

            {/* Card Misi (Light Clean) */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-100 shadow-xl shadow-slate-100 relative group hover:border-violet-100 transition-colors">
              <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Misi Utama
              </h3>
              <ul className="space-y-4">
                {[
                  "Pelayanan informasi pasar kerja yang up-to-date.",
                  "Peningkatan kompetensi lulusan via pelatihan.",
                  "Perluasan kerjasama (MoU) dengan DUDI.",
                  "Penanaman jiwa kewirausahaan (Entrepreneur).",
                  "Pelaksanaan Tracer Study berkala.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-slate-600 group/item"
                  >
                    <div className="mt-1 shrink-0">
                      <CheckCircle2
                        size={20}
                        className="text-slate-300 group-hover/item:text-violet-500 transition-colors"
                      />
                    </div>
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. TUJUAN (Bento Grid) ================= */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Fokus & Tujuan Kami
          </h2>
          <p className="text-slate-500 text-lg">
            Tiga pilar utama layanan BKK dalam mendukung kesuksesan karir siswa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Briefcase,
              color: "violet",
              title: "Penyaluran Kerja",
              desc: "Memfasilitasi lulusan untuk mendapatkan pekerjaan yang sesuai kompetensi keahlian.",
            },
            {
              icon: Users,
              color: "pink",
              title: "Kemitraan Industri",
              desc: "Membangun ekosistem kerjasama strategis dengan perusahaan bonafit (DUDI).",
            },
            {
              icon: Award,
              color: "amber",
              title: "Pengembangan Skill",
              desc: "Membekali siswa dengan etika kerja, soft-skill, dan karakter profesional.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
                ${item.color === "violet" ? "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white" : ""}
                ${item.color === "pink" ? "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white" : ""}
                ${item.color === "amber" ? "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" : ""}
              `}
              >
                <item.icon size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900">
                {item.title}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. STRUKTUR ORGANISASI (Premium Cards) ================= */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-4">
            <span className="py-1 px-3 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
              Tim Kami
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-16">
            Struktur Organisasi
          </h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Kepala Sekolah */}
            <div className="group w-72">
              <div className="relative mb-6 mx-auto w-56 h-56">
                {/* Decorative Border */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 group-hover:border-violet-400 group-hover:rotate-180 transition-all duration-700"></div>
                {/* Image Container */}
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-95 transition-transform duration-300">
                  <img
                    src={fotoKepsek}
                    alt="Kepala Sekolah"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                Nurlathifah, M.Pd.Gr
              </h3>
              <p className="text-violet-600 font-bold text-sm uppercase tracking-wide">
                Kepala Sekolah
              </p>
            </div>

            {/* Ketua BKK */}
            <div className="group w-72">
              <div className="relative mb-6 mx-auto w-56 h-56">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 group-hover:border-violet-400 group-hover:-rotate-180 transition-all duration-700"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-95 transition-transform duration-300">
                  <img
                    src={bkk}
                    alt="Ketua BKK"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                Rian Hidayat, M.Pd
              </h3>
              <p className="text-violet-600 font-bold text-sm uppercase tracking-wide">
                Ketua BKK
              </p>
            </div>

            {/* Staff (Placeholder menggunakan foto yang sama) */}
            <div className="group w-72">
              <div className="relative mb-6 mx-auto w-56 h-56">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 group-hover:border-violet-400 group-hover:rotate-180 transition-all duration-700"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:scale-95 transition-transform duration-300">
                  <img
                    src={bkk}
                    alt="Hubin"
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-1">
                Rian Hidayat, M.Pd
              </h3>
              <p className="text-violet-600 font-bold text-sm uppercase tracking-wide">
                Hubungan Industri
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profil;
