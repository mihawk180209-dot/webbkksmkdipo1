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
  CalendarDays,
} from "lucide-react";

const Lowongan = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);

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

  // FILTERING LOGIC
  const filteredJobs = jobs.filter((job) => {
    // 1. Filter by Search Term (Position OR Company)
    const matchesSearch =
      job.posisi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Filter by Job Type
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

  // Helper for Badge Colors
  const getJobTypeColor = (type) => {
    switch (type) {
      case "Full Time":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Part Time":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Magang / PKL":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Kontrak":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const jobTypes = [
    "Semua",
    "Full Time",
    "Part Time",
    "Magang / PKL",
    "Kontrak",
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* ================= 1. HERO HEADER ================= */}
      <div className="relative bg-slate-950 pt-32 pb-40 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg">
            <Sparkles size={14} className="text-amber-400" />
            <span>Pusat Karir & Alumni</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            Temukan Karir <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">
              Impianmu Disini
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Platform resmi penyaluran tenaga kerja SMK Diponegoro 1. Akses
            ribuan peluang karir terverifikasi dari mitra industri global.
          </p>
        </div>
      </div>

      {/* ================= 2. SEARCH & FILTER BAR ================= */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 flex flex-col md:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 px-2 w-full">
            <Search className="text-slate-400 shrink-0" size={22} />
            <input
              type="text"
              placeholder="Cari posisi pekerjaan atau perusahaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 outline-none text-slate-700 placeholder-slate-400 bg-transparent text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-100 mx-2"></div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="relative flex-1 md:flex-none">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`w-full md:w-48 flex items-center justify-between px-4 py-3 font-semibold rounded-xl border transition-all duration-200 ${
                  filterType !== "Semua"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter size={18} />
                  <span className="truncate text-sm">
                    {filterType === "Semua" ? "Tipe Pekerjaan" : filterType}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilterType(type);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${
                        filterType === type
                          ? "text-indigo-600 bg-indigo-50/50"
                          : "text-slate-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button (Visual) */}
            <button className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:transform active:scale-95 transition-all">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. JOB LISTING CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* List Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            Lowongan Terbaru
            <span className="bg-slate-100 text-slate-600 text-xs py-1 px-3 rounded-full font-bold">
              {filteredJobs.length}
            </span>
          </h2>

          {(searchTerm || filterType !== "Semua") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("Semua");
              }}
              className="text-sm font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 self-start md:self-auto"
            >
              Reset Filter <X size={14} />
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse flex gap-6"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-xl"></div>
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-5 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-8 w-20 bg-slate-100 rounded-lg"></div>
                    <div className="h-8 w-20 bg-slate-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */

          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Tidak ada lowongan ditemukan
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Kami tidak dapat menemukan lowongan untuk kata kunci "
              <strong>{searchTerm}</strong>" dengan filter tipe "
              <strong>{filterType}</strong>".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("Semua");
              }}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Hapus Filter
            </button>
          </div>
        ) : (
          /* Job Cards Grid */
          <div className="flex flex-col gap-4">
            {filteredJobs.map((item) => (
              <Link
                to={`/lowongan/${item.id}`}
                key={item.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Company Logo / Placeholder */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                    <Building2 size={32} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                          {item.posisi}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-slate-600 font-medium text-sm md:text-base">
                            {item.perusahaan}
                          </p>
                          <CheckCircle2
                            size={16}
                            className="text-indigo-500 fill-indigo-50"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <Clock size={12} />
                        {getTimeAgo(item.created_at)}
                      </div>
                    </div>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      {/* Job Type Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold border ${getJobTypeColor(item.tipe_pekerjaan || "Full Time")}`}
                      >
                        <Briefcase size={12} />
                        {item.tipe_pekerjaan || "Full Time"}
                      </span>

                      {/* Location Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold">
                        <MapPin size={12} />
                        {item.lokasi || "Jakarta"}
                      </span>

                      {/* Salary Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold">
                        <Banknote size={12} className="text-emerald-600" />
                        {item.gaji || "Kompetitif"}
                      </span>
                    </div>
                  </div>

                  {/* Action Button (Desktop) */}
                  <div className="hidden md:flex flex-col justify-center items-end pl-4 border-l border-slate-100">
                    <span className="flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                      Detail <ArrowRight size={16} />
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
