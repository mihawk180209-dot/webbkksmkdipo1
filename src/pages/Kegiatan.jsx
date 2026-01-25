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
} from "lucide-react";

const Kegiatan = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE FILTER & SEARCH ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua"); // Pilihan: Semua, Akan Datang, Selesai
  const [showFilter, setShowFilter] = useState(false); // Toggle Dropdown

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .order("tanggal_event", { ascending: false });

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  };

  // --- LOGIKA FILTERING UTAMA ---
  const filteredEvents = events.filter((item) => {
    // 1. Filter Pencarian (Nama atau Lokasi)
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      item.nama_event.toLowerCase().includes(searchLower) ||
      (item.lokasi && item.lokasi.toLowerCase().includes(searchLower));

    // 2. Filter Waktu (Status)
    const eventDate = new Date(item.tanggal_event);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset jam agar perbandingan akurat per hari

    let matchesFilter = true;
    if (filterStatus === "Akan Datang") {
      // Tampilkan jika tanggal event >= hari ini
      matchesFilter = eventDate >= today;
    } else if (filterStatus === "Selesai") {
      // Tampilkan jika tanggal event < hari ini
      matchesFilter = eventDate < today;
    }

    return matchesSearch && matchesFilter;
  });

  // Opsi Filter Menu
  const filterOptions = ["Semua", "Akan Datang", "Selesai"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-violet-200 selection:text-violet-900">
      {/* 1. HERO HEADER */}
      <div className="relative bg-slate-950 pt-32 pb-32 px-4 overflow-hidden">
        {/* ... (Background Effects sama) ... */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={12} className="text-amber-400" />
            Agenda Resmi Sekolah
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Jelajahi Kegiatan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              BKK SMK Diponegoro 1
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Informasi lengkap mengenai jadwal rekrutmen, job fair, seminar
            karir, dan berbagai kegiatan pengembangan diri lainnya.
          </p>
        </div>
      </div>

      {/* 2. FLOATING SEARCH BAR & FILTER */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 flex flex-col md:flex-row items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="flex-1 flex items-center gap-3 px-2 w-full">
            <Search className="text-slate-400 shrink-0" size={24} />
            <input
              type="text"
              placeholder="Cari nama kegiatan atau lokasi..."
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
            {/* --- DROPDOWN FILTER --- */}
            <div className="relative flex-1 md:flex-none">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl transition-colors border ${
                  filterStatus !== "Semua"
                    ? "bg-violet-50 text-violet-600 border-violet-200"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Filter size={18} />
                <span className="truncate">
                  {filterStatus === "Semua" ? "Filter" : filterStatus}
                </span>
              </button>

              {/* Dropdown Menu UI */}
              {showFilter && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-30 animate-fade-in-up">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors flex justify-between items-center ${
                        filterStatus === option
                          ? "text-violet-600 bg-violet-50"
                          : "text-slate-600"
                      }`}
                    >
                      {option}
                      {filterStatus === option && <Check size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex-1 md:flex-none px-8 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* 3. EVENT GRID CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header List & Result Count */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Daftar Kegiatan{" "}
            <span className="text-slate-400 font-normal text-sm ml-2">
              ({filteredEvents.length})
            </span>
          </h2>

          {/* Tombol Reset jika ada filter aktif */}
          {(searchTerm || filterStatus !== "Semua") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("Semua");
              }}
              className="text-sm font-medium text-rose-500 hover:text-rose-700 flex items-center gap-1"
            >
              Reset Filter <X size={14} />
            </button>
          )}
        </div>

        {loading ? (
          // ... (Skeleton Loading sama) ...
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl h-[450px] animate-pulse border border-slate-100 p-4"
              >
                <div className="bg-slate-100 h-48 rounded-2xl mb-4"></div>
                <div className="h-6 bg-slate-100 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          // Empty State Custom Message
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Tidak ada kegiatan ditemukan
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Tidak ada hasil untuk pencarian "<strong>{searchTerm}</strong>"
              dengan status "<strong>{filterStatus}</strong>".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("Semua");
              }}
              className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition"
            >
              Lihat Semua Kegiatan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => (
              <Link
                to={`/kegiatan/${item.id}`}
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-violet-100/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image Header with Date Badge */}
                <div className="h-60 w-full relative overflow-hidden bg-slate-100">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.nama_event}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-200">
                      <Calendar size={64} />
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Modern Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-lg min-w-[70px]">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {new Date(item.tanggal_event).toLocaleDateString(
                        "id-ID",
                        { month: "short" },
                      )}
                    </span>
                    <span className="block text-2xl font-extrabold text-violet-600 leading-none mt-0.5">
                      {new Date(item.tanggal_event).getDate()}
                    </span>
                  </div>

                  {/* Status Tag (NEW: Berubah sesuai filter waktu) */}
                  <div className="absolute top-4 right-4">
                    {new Date(item.tanggal_event) >=
                    new Date().setHours(0, 0, 0, 0) ? (
                      <span className="px-3 py-1 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                        Akan Datang
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-500/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 flex flex-col flex-grow relative">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 leading-tight group-hover:text-violet-600 transition-colors line-clamp-2">
                    {item.nama_event}
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500 shrink-0">
                        <Clock size={16} />
                      </div>
                      <span>
                        {item.jam_mulai
                          ? item.jam_mulai.substring(0, 5)
                          : "08:00"}{" "}
                        WIB - Selesai
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                        <MapPin size={16} />
                      </div>
                      <span className="truncate">{item.lokasi}</span>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between group/btn">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-violet-500 transition-colors">
                      Lihat Detail
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <ArrowRight size={18} />
                    </div>
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

export default Kegiatan;
