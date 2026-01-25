import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Building2,
  Clock,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Share2,
  MapPin,
  Banknote,
  GraduationCap,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

const DetailLowongan = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [id]);

  const fetchJobDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lowongan")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error:", error);
    } else {
      setJob(data);
    }
    setLoading(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Baru saja diposting";
    if (diffDays <= 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin h-10 w-10 border-4 border-violet-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Memuat info lowongan...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-32 text-center bg-slate-50 px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Lowongan Tidak Ditemukan
          </h2>
          <p className="text-slate-500 mb-6">
            Lowongan ini mungkin sudah ditutup atau tautan rusak.
          </p>
          <Link
            to="/lowongan"
            className="inline-block px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition"
          >
            Cari Lowongan Lain
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      {/* 1. TOP HEADER BACKGROUND */}
      <div className="h-[350px] w-full bg-slate-900 absolute top-0 left-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-28 md:pt-36">
        {/* BREADCRUMB */}
        <Link
          to="/lowongan"
          className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium">Kembali ke Bursa Kerja</span>
        </Link>

        {/* 2. MAIN HEADER CARD */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 mb-8 border border-slate-100 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0 border border-violet-100 shadow-sm">
              <Building2 size={48} className="opacity-80" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  {job.tipe_pekerjaan || "Full Time"}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
                {job.posisi}
              </h1>

              <div className="flex items-center gap-2 text-lg text-slate-600 font-medium mb-6">
                <Building2 size={20} className="text-slate-400" />
                {job.perusahaan}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Lokasi
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <MapPin size={16} className="text-rose-500" />
                    {job.lokasi || "Jakarta"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Gaji
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Banknote size={16} className="text-green-600" />
                    {job.gaji || "Kompetitif"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Pendidikan
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <GraduationCap size={16} className="text-blue-500" />
                    {job.pendidikan || "SMK / Sederajat"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">
                    Diposting
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Clock size={16} className="text-amber-500" />
                    {formatDate(job.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
              <button
                onClick={() =>
                  alert("Silakan hubungi BKK Sekolah untuk proses pelamaran.")
                }
                className="w-full py-3.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 shadow-lg shadow-violet-200 transition active:scale-95"
              >
                Lamar Sekarang
              </button>
              <button
                onClick={handleShare}
                className="w-full py-3.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Share2 size={18} />
                )}
                {copied ? "Link Disalin" : "Bagikan"}
              </button>
            </div>
          </div>
        </div>

        {/* 3. CONTENT LAYOUT (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                  <Briefcase size={20} />
                </span>
                Deskripsi Pekerjaan
              </h3>

              {/* HAPUS BAGIAN PERSYARATAN HARDCODED DI SINI */}
              {/* Kita hanya tampilkan deskripsi dinamis dari DB */}
              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed text-justify">
                <p className="whitespace-pre-line">{job.deskripsi}</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4 items-start">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-amber-800 mb-1">
                  Penting: Hati-hati Penipuan!
                </h4>
                <p className="text-sm text-amber-700/80 leading-relaxed">
                  BKK SMK Diponegoro 1 tidak pernah memungut biaya apapun
                  (travel, akomodasi, administrasi) kepada calon pelamar dalam
                  proses seleksi ini. Laporkan jika ada kejanggalan.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">
                Ringkasan Lowongan
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Pastikan profil Anda sesuai sebelum melamar.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Posisi</span>
                  <span className="text-sm font-bold text-slate-800 text-right">
                    {job.posisi}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Perusahaan</span>
                  <span className="text-sm font-bold text-slate-800 text-right">
                    {job.perusahaan}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                    OPEN
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  alert("Silakan hubungi BKK Sekolah untuk proses pelamaran.")
                }
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-violet-500/30 transition transform hover:-translate-y-1 mb-3 flex items-center justify-center gap-2"
              >
                Lamar Sekarang
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 md:hidden"
              >
                {copied ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Share2 size={18} />
                )}
                {copied ? "Link Disalin" : "Bagikan"}
              </button>

              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400">
                  ID Lowongan:{" "}
                  <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-500">
                    #{job.id}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLowongan;
