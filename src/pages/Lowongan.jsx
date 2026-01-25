import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import {
  Search,
  Building2,
  Briefcase,
  Clock,
  ArrowRight,
  MapPin,
  Banknote,
  Filter,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";

const Lowongan = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua"); // Filter Tipe Pekerjaan
  const [showFilter, setShowFilter] = useState(false); // Toggle dropdown filter mobile

  useEffect(() => {
    fetchLowongan();
  }, []);

  const fetchLowongan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lowongan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  // LOGIKA FILTERING UTAMA
  const filteredJobs = jobs.filter((job) => {
    // 1. Filter by Search Term (Posisi OR Perusahaan)
    const matchesSearch =
      job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Filter by Job Type (Full Time, Part Time, etc)
    const matchesType =
      filterType === "Semua" ||
      (job.tipe_pekerjaan && job.tipe_pekerjaan === filterType);

    return matchesSearch && matchesType;
  });

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Baru saja";
    if (diffDays <= 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  // Opsi untuk filter dropdown
  const jobTypes = [
    "Semua",
    "Full Time",
    "Part Time",
    "Magang / PKL",
    "Kontrak",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* 1. HERO HEADER */}
      <div className="relative bg-slate-950 pt-32 pb-32 px-4 overflow-hidden">
        {/* ... (Background effects sama) ... */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={12} className="text-amber-400" />
            Bursa Kerja Khusus
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Temukan Karir <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Impianmu Disini
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Akses ribuan peluang kerja terverifikasi dari mitra industri
            terpercaya SMK Diponegoro 1. Mulai langkah suksesmu hari ini.
          </p>
        </div>
      </div>

      {/* 2. FLOATING SEARCH BAR & FILTER */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex flex-col md:flex-row items-center gap-4 transition-transform hover:-translate-y-1">
          {/* Input Pencarian */}
          <div className="flex-1 flex items-center gap-3 px-2 w-full">
            <Search className="text-slate-400 shrink-0" size={24} />
            <input
              type="text"
              placeholder="Cari posisi pekerjaan atau nama perusahaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 outline-none text-slate-700 placeholder-slate-400 bg-transparent text-lg font-medium"
            />
            {/* Tombol Clear Search */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="relative flex-1 md:flex-none">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl border transition-colors ${
                  filterType !== "Semua"
                    ? "bg-violet-50 text-violet-600 border-violet-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Filter size={18} />
                <span className="truncate">
                  {filterType === "Semua" ? "Filter Tipe" : filterType}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30 animate-fade-in-up">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors ${
                        filterType === type
                          ? "text-violet-600 bg-violet-50"
                          : "text-slate-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tombol Cari (Visual saja karena search sudah real-time) */}
            <button className="flex-1 md:flex-none px-8 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* 3. JOB LIST CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Header Section List */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Lowongan Terbaru{" "}
            <span className="text-slate-400 font-normal text-sm ml-2">
              ({filteredJobs.length} posisi)
            </span>
          </h2>

          {/* Indikator Filter Aktif */}
          {(searchTerm || filterType !== "Semua") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("Semua");
              }}
              className="text-sm font-medium text-rose-500 hover:text-rose-700 flex items-center gap-1"
            >
              Reset Filter <X size={14} />
            </button>
          )}
        </div>

        {loading ? (
          // ... (Skeleton Loading sama) ...
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-100 animate-pulse flex gap-4"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-xl"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          // Empty State Custom Message
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Tidak ditemukan lowongan
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Tidak ada lowongan untuk "<strong>{searchTerm}</strong>" dengan
              tipe "<strong>{filterType}</strong>". Coba ubah kata kunci atau
              reset filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("Semua");
              }}
              className="mt-6 px-6 py-2.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredJobs.map((item) => (
              <Link
                to={`/lowongan/${item.id}`}
                key={item.id}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* LOGO PERUSAHAAN (DIPERBESAR) */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors p-2">
                    {/* Menggunakan Building2 sebagai placeholder logo, ukurannya diperbesar */}
                    <Building2 size={40} />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-violet-700 transition-colors line-clamp-1">
                          {item.posisi}
                        </h3>
                        {/* NAMA PERUSAHAAN (DITAMPILKAN JELAS) */}
                        <p className="text-slate-600 font-bold text-base mt-1 flex items-center gap-2">
                          <Building2 size={16} className="text-slate-400" />
                          {item.perusahaan}
                          <CheckCircle2 size={14} className="text-green-500" />
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-bold whitespace-nowrap border border-slate-100 h-fit">
                        <Clock size={12} />
                        {getTimeAgo(item.created_at)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100">
                        <MapPin size={14} className="text-slate-400" />
                        {item.lokasi || "Jakarta"}
                      </div>

                      {/* Highlight Badge Tipe Pekerjaan */}
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          item.tipe_pekerjaan === "Full Time"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : item.tipe_pekerjaan === "Part Time"
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-slate-50 text-slate-600 border-slate-100"
                        }`}
                      >
                        <Briefcase size={14} />
                        {item.tipe_pekerjaan || "Full Time"}
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
                        <Banknote size={14} className="text-green-600" />
                        {item.gaji || "Kompetitif"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-end min-w-[120px]">
                    <span className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-violet-600 transition-colors">
                      Lihat Detail <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lowongan;
