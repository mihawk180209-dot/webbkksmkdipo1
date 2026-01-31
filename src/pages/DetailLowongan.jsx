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
  Check,
  Calendar,
  Info,
} from "lucide-react";

const DetailLowongan = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchJobDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJobDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lowongan")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching job details:", error);
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
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Baru saja";
    if (diffDays <= 7) return `${diffDays} hari yang lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="animate-spin h-8 w-8 border-4 border-violet-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-slate-600 font-medium text-sm">
            Memuat data lowongan...
          </p>
        </div>
      </div>
    );
  }

  // --- Error / Not Found State ---
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-lg border border-slate-100 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={32} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Lowongan Tidak Ditemukan
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Mohon maaf, lowongan yang Anda cari mungkin sudah ditutup,
            kadaluarsa, atau tautan yang Anda gunakan tidak valid.
          </p>
          <Link
            to="/lowongan"
            className="inline-flex items-center justify-center px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition w-full"
          >
            Kembali ke Bursa Kerja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 relative selection:bg-violet-100 selection:text-violet-900">
      {/* 1. HEADER BACKGROUND DECORATION */}
      <div className="h-[400px] w-full bg-slate-900 absolute top-0 left-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 pt-28 md:pt-36">
        {/* BREADCRUMB NAVIGATION */}
        <div className="mb-8">
          <Link
            to="/lowongan"
            className="inline-flex items-center text-slate-300 hover:text-white transition-colors group text-sm font-medium"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Daftar Lowongan
          </Link>
        </div>

        {/* 2. MAIN HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-10 mb-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Company Logo / Placeholder */}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-slate-50 to-slate-100 text-slate-400 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-200 shadow-inner">
              <Building2 size={40} strokeWidth={1.5} />
            </div>

            {/* Title & Company Info */}
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-violet-50 text-violet-700 border border-violet-100 rounded text-xs font-semibold uppercase tracking-wider">
                  {job.tipe_pekerjaan || "Full Time"}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 size={12} />
                  Verified
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                {job.posisi}
              </h1>

              <div className="flex items-center gap-2 text-lg text-slate-600 font-medium mb-6">
                <Building2 size={18} className="text-slate-400" />
                {job.perusahaan}
              </div>

              {/* Quick Meta Data Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 py-6 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                    Lokasi
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-rose-500" />
                    {job.lokasi || "Jakarta"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                    Penawaran Gaji
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Banknote size={16} className="text-emerald-600" />
                    {job.gaji || "Kompetitif"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                    Kualifikasi
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <GraduationCap size={16} className="text-blue-500" />
                    {job.pendidikan || "SMK / Sederajat"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                    Diposting
                  </span>
                  <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} className="text-amber-500" />
                    {formatDate(job.created_at)}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
              <button
                onClick={() =>
                  alert("Silakan hubungi BKK Sekolah untuk proses pelamaran.")
                }
                className="w-full py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all active:scale-[0.98]"
              >
                Lamar Sekarang
              </button>
              <button
                onClick={handleShare}
                className="w-full py-3 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-emerald-600" />
                    <span className="text-emerald-600">Disalin</span>
                  </>
                ) : (
                  <>
                    <Share2 size={18} />
                    <span>Bagikan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. CONTENT LAYOUT (Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Deskripsi Pekerjaan
                </h3>
              </div>

              <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {job.deskripsi ? (
                  job.deskripsi
                ) : (
                  <p className="italic text-slate-400">
                    Tidak ada deskripsi detail untuk lowongan ini.
                  </p>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100/50 flex gap-4 items-start">
              <AlertTriangle
                size={24}
                className="text-amber-600 shrink-0 mt-1"
              />
              <div>
                <h4 className="font-bold text-amber-900 mb-1 text-sm">
                  Penting: Hindari Penipuan
                </h4>
                <p className="text-sm text-amber-800/80 leading-relaxed">
                  BKK SMK Diponegoro 1 tidak pernah memungut biaya apapun
                  (travel, akomodasi, administrasi) kepada calon pelamar dalam
                  proses seleksi ini. Pastikan Anda melamar melalui jalur resmi.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
              <h3 className="font-bold text-slate-800 mb-2 text-base flex items-center gap-2">
                <Info size={18} className="text-violet-600" />
                Ringkasan Lowongan
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Tinjauan singkat informasi posisi.
              </p>

              <div className="space-y-0 mb-6 bg-slate-50 rounded-lg p-4 border border-slate-100">
                <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-200/60">
                  <span className="text-xs text-slate-500 font-medium">
                    Posisi
                  </span>
                  <span className="text-sm font-bold text-slate-800 text-right w-1/2">
                    {job.posisi}
                  </span>
                </div>
                <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-200/60">
                  <span className="text-xs text-slate-500 font-medium">
                    Perusahaan
                  </span>
                  <span className="text-sm font-bold text-slate-800 text-right w-1/2">
                    {job.perusahaan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">
                    Status
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                    OPEN FOR HIRE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    alert("Silakan hubungi BKK Sekolah untuk proses pelamaran.")
                  }
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md shadow-violet-500/20 transition-all flex items-center justify-center gap-2"
                >
                  Lamar Sekarang
                </button>

                {/* Mobile Share Button */}
                <button
                  onClick={handleShare}
                  className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition md:hidden flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={18} className="text-emerald-600" />
                      <span className="text-emerald-600">Link Disalin</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={18} />
                      <span>Bagikan Lowongan</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                  <span className="text-xs text-slate-400">ID:</span>
                  <span className="text-xs font-mono font-medium text-slate-600">
                    #{job.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLowongan;
