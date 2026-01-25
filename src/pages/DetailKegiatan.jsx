import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Clock,
  Share2,
  CalendarDays,
  Check,
  AlignLeft,
  Sparkles,
  Info,
} from "lucide-react";

const DetailKegiatan = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  const fetchEventDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error:", error);
    } else {
      setEvent(data);
    }
    setLoading(false);
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    const title = encodeURIComponent(event.nama_event);
    const location = encodeURIComponent(event.lokasi);
    const details = encodeURIComponent(
      `Detail: ${event.deskripsi || ""} \n\nLink: ${window.location.href}`,
    );
    const dateRaw = event.tanggal_event.replace(/-/g, "");
    const timeStart = event.jam_mulai
      ? event.jam_mulai.replace(/:/g, "").substring(0, 4) + "00"
      : "080000";
    const timeEnd = event.jam_selesai
      ? event.jam_selesai.replace(/:/g, "").substring(0, 4) + "00"
      : "170000";
    const startDate = `${dateRaw}T${timeStart}`;
    const endDate = `${dateRaw}T${timeEnd}`;
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(calendarUrl, "_blank");
  };

  const handleShare = async () => {
    const shareData = {
      title: event.nama_event,
      text: `Ikuti kegiatan ${event.nama_event} di SMK Diponegoro 1!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDateFull = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Loading State dengan Skeleton sederhana
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-violet-600 border-t-transparent rounded-full"></div>
          <p className="text-slate-500 animate-pulse">
            Memuat detail kegiatan...
          </p>
        </div>
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen pt-32 text-center bg-slate-50 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-md">
          <Info size={48} className="text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Kegiatan Tidak Ditemukan
          </h3>
          <p className="text-slate-500 mb-6">
            Mungkin kegiatan ini sudah dihapus atau link yang Anda tuju salah.
          </p>
          <Link
            to="/kegiatan"
            className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition"
          >
            Kembali ke Agenda
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20 relative overflow-x-hidden">
      {/* 1. IMMERSIVE HERO HEADER */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-slate-900 overflow-hidden z-0">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-900/40 via-slate-900/80 to-slate-900 z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10 pt-28 md:pt-36">
        {/* Breadcrumb / Back Button */}
        <Link
          to="/kegiatan"
          className="group inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/10">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium text-sm tracking-wide">
            Kembali ke Agenda
          </span>
        </Link>

        {/* 2. FLOATING CARD CONTAINER */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-fade-in-up">
          {/* IMAGE SECTION */}
          <div className="w-full relative aspect-video md:h-[450px] bg-slate-100 overflow-hidden group">
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.nama_event}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              // Fallback Image jika tidak ada gambar
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                <Calendar size={64} className="mb-4 opacity-20" />
                <p className="font-medium">Tidak ada gambar preview</p>
              </div>
            )}

            {/* Overlay Gradient pada Gambar (Bawah) */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

            {/* Kategori Badge di atas Gambar */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/90 backdrop-blur-md text-violet-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                <Sparkles size={12} className="text-amber-500" />
                Agenda Sekolah
              </span>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="px-6 py-8 md:px-12 md:py-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight flex-1">
                {event.nama_event}
              </h1>

              {/* Status Indicator (Optional) */}
              <div className="shrink-0">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-green-50 text-green-700 text-sm font-semibold border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Upload By Hubin
                </span>
              </div>
            </div>

            {/* 3. INFO GRID (Modern Box Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {/* Box Tanggal */}
              <div className="flex flex-col justify-center p-5 bg-violet-50/50 rounded-2xl border border-violet-100 hover:border-violet-200 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-violet-600 shadow-sm group-hover:scale-110 transition-transform">
                    <CalendarDays size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Tanggal
                  </p>
                </div>
                <p className="font-bold text-slate-800 ml-1">
                  {formatDateFull(event.tanggal_event)}
                </p>
              </div>

              {/* Box Waktu */}
              <div className="flex flex-col justify-center p-5 bg-pink-50/50 rounded-2xl border border-pink-100 hover:border-pink-200 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-pink-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Clock size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Waktu
                  </p>
                </div>
                <p className="font-bold text-slate-800 ml-1">
                  {event.jam_mulai
                    ? `${event.jam_mulai.substring(0, 5)} WIB`
                    : "-"}{" "}
                  s/d Selesai
                </p>
              </div>

              {/* Box Lokasi */}
              <div className="flex flex-col justify-center p-5 bg-amber-50/50 rounded-2xl border border-amber-100 hover:border-amber-200 transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Lokasi
                  </p>
                </div>
                <p
                  className="font-bold text-slate-800 ml-1 truncate"
                  title={event.lokasi}
                >
                  {event.lokasi}
                </p>
              </div>
            </div>

            {/* DESKRIPSI & SIDEBAR LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <AlignLeft size={20} className="text-violet-600" />
                  Deskripsi Lengkap
                </h3>
                <div className="prose prose-lg prose-slate prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-violet-600 max-w-none text-justify">
                  {event.deskripsi ? (
                    <p className="whitespace-pre-line leading-relaxed">
                      {event.deskripsi}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic">
                      Tidak ada deskripsi tambahan.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 4. ACTION BUTTONS */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 transition-all flex items-center justify-center gap-2 group"
              >
                {copied ? (
                  <>
                    <Check size={20} className="text-green-600" />
                    <span className="text-green-600">Link Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2
                      size={20}
                      className="group-hover:-translate-y-1 transition-transform"
                    />
                    Bagikan Info
                  </>
                )}
              </button>

              <button
                onClick={handleAddToCalendar}
                className="flex-[2] px-6 py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 transition-all flex items-center justify-center gap-2 group"
              >
                <Calendar size={20} className="group-hover:animate-pulse" />
                Simpan ke Google Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-400 text-sm mt-8 pb-8">
          Informasi dapat berubah sewaktu-waktu. Hubungi BKK untuk info lebih
          lanjut.
        </p>
      </div>
    </div>
  );
};

export default DetailKegiatan;
