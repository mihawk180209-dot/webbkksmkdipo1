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
  Building2,
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
    try {
      const { data, error } = await supabase
        .from("kegiatan")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    const title = encodeURIComponent(event.nama_event);
    const location = encodeURIComponent(event.lokasi);
    const details = encodeURIComponent(
      `Detail: ${event.deskripsi || ""} \n\nLink: ${window.location.href}`,
    );

    // Format date string safely
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
      } catch (err) {
        console.log("Share canceled");
      }
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

  // --- LOADING STATE ---
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-violet-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Memuat detail agenda...
        </p>
      </div>
    );

  // --- NOT FOUND STATE ---
  if (!event)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <Info size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Kegiatan Tidak Ditemukan
          </h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Agenda yang Anda cari mungkin telah dihapus, kedaluwarsa, atau
            tautan yang Anda gunakan salah.
          </p>
          <Link
            to="/kegiatan"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all w-full"
          >
            <ArrowLeft size={18} /> Kembali ke Agenda
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 relative overflow-x-hidden">
      {/* 1. IMMERSIVE HERO BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[450px] bg-slate-900 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-violet-900/40 via-slate-900/90 to-slate-900 z-10"></div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-28 md:pt-32">
        {/* Navigation Breadcrumb */}
        <Link
          to="/kegiatan"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/5">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium text-sm tracking-wide">
            Kembali ke Daftar
          </span>
        </Link>

        {/* 2. MAIN CARD CONTAINER */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-fade-in-up">
          {/* A. EVENT IMAGE HEADER */}
          <div className="w-full relative aspect-video md:h-[400px] bg-slate-100 overflow-hidden group">
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.nama_event}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 border-b border-slate-100">
                <Building2 size={64} className="mb-4 text-slate-300" />
                <p className="font-medium text-slate-400">
                  Tidak ada gambar preview
                </p>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md text-violet-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-white/20">
                <Sparkles size={12} className="text-amber-500" />
                Agenda Sekolah
              </span>
            </div>

            {/* Title Overlay (Mobile Friendly) */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                {event.nama_event}
              </h1>
            </div>
          </div>

          {/* B. CONTENT BODY */}
          <div className="px-6 py-8 md:px-10 md:py-10">
            {/* 3. KEY DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {/* Date Block */}
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl text-violet-600 shadow-sm border border-slate-100 shrink-0">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Tanggal
                  </p>
                  <p className="font-bold text-slate-800 text-sm md:text-base">
                    {formatDateFull(event.tanggal_event)}
                  </p>
                </div>
              </div>

              {/* Time Block */}
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl text-pink-600 shadow-sm border border-slate-100 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Waktu
                  </p>
                  <p className="font-bold text-slate-800 text-sm md:text-base">
                    {event.jam_mulai
                      ? `${event.jam_mulai.substring(0, 5)} WIB`
                      : "-"}{" "}
                    s/d Selesai
                  </p>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-3 bg-white rounded-xl text-amber-600 shadow-sm border border-slate-100 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Lokasi
                  </p>
                  <p className="font-bold text-slate-800 text-sm md:text-base line-clamp-2">
                    {event.lokasi}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. DESCRIPTION SECTION */}
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-100 pb-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <AlignLeft size={20} className="text-slate-400" />
                  Deskripsi Kegiatan
                </h3>
              </div>

              <div className="prose prose-slate prose-p:text-slate-600 prose-headings:text-slate-800 max-w-none">
                {event.deskripsi ? (
                  <p className="whitespace-pre-line leading-relaxed text-justify">
                    {event.deskripsi}
                  </p>
                ) : (
                  <p className="text-slate-400 italic">
                    Tidak ada deskripsi tambahan untuk kegiatan ini.
                  </p>
                )}
              </div>
            </div>

            {/* 5. ACTION BUTTONS */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all flex items-center justify-center gap-2 group focus:ring-2 focus:ring-slate-200 focus:outline-none"
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-green-600" />
                    <span className="text-green-600">Link Tersalin</span>
                  </>
                ) : (
                  <>
                    <Share2
                      size={18}
                      className="group-hover:-translate-y-0.5 transition-transform"
                    />
                    Bagikan Info
                  </>
                )}
              </button>

              <button
                onClick={handleAddToCalendar}
                className="flex-[2] px-6 py-3.5 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-200 transition-all flex items-center justify-center gap-2 group focus:ring-2 focus:ring-violet-300 focus:outline-none"
              >
                <Calendar size={18} />
                Simpan ke Google Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-slate-400 text-sm mt-8 pb-12">
          &copy; {new Date().getFullYear()} SMK Diponegoro 1. Semua hak
          dilindungi.
        </p>
      </div>
    </div>
  );
};

export default DetailKegiatan;
