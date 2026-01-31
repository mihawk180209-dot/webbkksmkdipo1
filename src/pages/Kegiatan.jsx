import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Filter,
  X,
  Check,
  Info,
} from "lucide-react";

const Kegiatan = () => {
  // --- STATE MANAGEMENT ---
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua"); // Options: Semua, Akan Datang, Selesai
  const [showFilter, setShowFilter] = useState(false);

  // --- INITIAL LOAD ---
  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("kegiatan")
        .select("*")
        .order("tanggal_event", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HELPER FUNCTIONS ---

  // Format Date to Indonesian Standard
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

  // Determine Event Status Logic
  const getEventStatus = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today ? "Akan Datang" : "Selesai";
  };

  // --- FILTERING LOGIC ---
  const filteredEvents = events.filter((item) => {
    // 1. Search Filter (Name or Location)
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.nama_event.toLowerCase().includes(searchLower) ||
      (item.lokasi && item.lokasi.toLowerCase().includes(searchLower));

    // 2. Time Status Filter
    const status = getEventStatus(item.tanggal_event);
    let matchesFilter = true;

    if (filterStatus === "Akan Datang") {
      matchesFilter = status === "Akan Datang";
    } else if (filterStatus === "Selesai") {
      matchesFilter = status === "Selesai";
    }

    return matchesSearch && matchesFilter;
  });

  const filterOptions = ["Semua", "Akan Datang", "Selesai"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* 1. HERO HEADER */}
      <div className="relative bg-slate-900 pt-32 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 opacity-70"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-violet-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg">
            <Sparkles size={14} className="text-amber-400" />
            <span>Agenda Resmi Sekolah</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Jelajahi Kegiatan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              BKK SMK Diponegoro 1
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Informasi lengkap mengenai jadwal rekrutmen, job fair, seminar
            karir, dan berbagai kegiatan pengembangan diri lainnya.
          </p>
        </div>
      </div>

      {/* 2. FLOATING SEARCH BAR & FILTER */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/60 flex flex-col md:flex-row items-center gap-2">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full">
            <Search className="text-slate-400 shrink-0" size={22} />
            <input
              type="text"
              placeholder="Cari agenda, seminar, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-base font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-slate-400 hover:text-rose-500 transition-colors"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="hidden md:block w-px h-8 bg-slate-200 mx-2"></div>

          {/* Filter & Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto p-1">
            {/* Dropdown Filter */}
            <div className="relative flex-1 md:flex-none">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`w-full md:w-40 flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all border ${
                  filterStatus !== "Semua"
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>
                    {filterStatus === "Semua" ? "Filter" : filterStatus}
                  </span>
                </div>
              </button>

              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 overflow-hidden ring-1 ring-black/5">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex justify-between items-center ${
                        filterStatus === option
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {option}
                      {filterStatus === option && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex-1 md:flex-none px-8 py-3 bg-violet-600 text-white text-sm font-bold rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all active:scale-95">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* 3. EVENT GRID CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            Daftar Kegiatan
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">
              {filteredEvents.length} Items
            </span>
          </h2>

          {(searchTerm || filterStatus !== "Semua") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("Semua");
              }}
              className="text-sm font-semibold text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <X size={16} /> Reset Filter
            </button>
          )}
        </div>

        {loading ? (
          // Loading Skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-4 h-[420px] animate-pulse"
              >
                <div className="bg-slate-200 h-48 rounded-xl mb-5"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-slate-50">
              <CalendarDays className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Tidak ada kegiatan ditemukan
            </h3>
            <p className="text-slate-500 text-center max-w-md mb-8">
              Kami tidak dapat menemukan hasil untuk pencarian "
              <strong>{searchTerm}</strong>" dengan status "
              <strong>{filterStatus}</strong>".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("Semua");
              }}
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              Bersihkan Filter
            </button>
          </div>
        ) : (
          // Events Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => {
              const dateData = formatDate(item.tanggal_event);
              const status = getEventStatus(item.tanggal_event);
              const isUpcoming = status === "Akan Datang";

              return (
                <Link
                  to={`/kegiatan/${item.id}`}
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Card Image Area */}
                  <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.nama_event}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                        <Calendar size={48} strokeWidth={1.5} />
                      </div>
                    )}

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl text-center shadow-lg min-w-[65px]">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {dateData.month}
                      </span>
                      <span className="block text-2xl font-extrabold text-slate-800 leading-none">
                        {dateData.day}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm backdrop-blur-md border border-white/10 ${
                          isUpcoming
                            ? "bg-emerald-500/90 text-white"
                            : "bg-slate-600/90 text-slate-200"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 leading-snug group-hover:text-violet-600 transition-colors line-clamp-2">
                      {item.nama_event}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 font-medium">
                          {item.jam_mulai
                            ? item.jam_mulai.substring(0, 5)
                            : "08:00"}{" "}
                          WIB - Selesai
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 font-medium line-clamp-1">
                          {item.lokasi || "Lokasi Sekolah"}
                        </span>
                      </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-violet-600">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Lihat Detail
                      </span>
                      <ArrowRight
                        size={18}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kegiatan;
