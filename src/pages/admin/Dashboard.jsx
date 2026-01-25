import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Briefcase,
  Calendar,
  Database,
  Plus,
  ArrowRight,
  Activity,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    loker: 0,
    kegiatan: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);

    try {
      const [lokerData, kegiatanData] = await Promise.all([
        supabase.from("lowongan").select("*", { count: "exact", head: true }),
        supabase.from("kegiatan").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        loker: lokerData.count || 0,
        kegiatan: kegiatanData.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          Ringkasan aktivitas Bursa Kerja Khusus (BKK) hari ini.
        </p>
      </div>

      {/* Grid Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* KARTU 1: Lowongan */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(147,51,234,0.1)] border border-slate-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Lowongan Aktif
              </p>
              <h3 className="text-4xl font-bold text-slate-800">
                {loading ? (
                  <span className="animate-pulse bg-slate-200 h-10 w-16 block rounded"></span>
                ) : (
                  stats.loker
                )}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Briefcase size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-400">
            <span className="text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded-full mr-2">
              Info
            </span>
            Posisi pekerjaan tersedia
          </div>
        </div>

        {/* KARTU 2: Kegiatan */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(147,51,234,0.1)] border border-slate-100 hover:shadow-md transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">
                Agenda Kegiatan
              </p>
              <h3 className="text-4xl font-bold text-slate-800">
                {loading ? (
                  <span className="animate-pulse bg-slate-200 h-10 w-16 block rounded"></span>
                ) : (
                  stats.kegiatan
                )}
              </h3>
            </div>
            <div className="p-3 bg-fuchsia-50 rounded-xl text-fuchsia-600 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-400">
            <span className="text-fuchsia-600 font-medium bg-fuchsia-50 px-2 py-0.5 rounded-full mr-2">
              Event
            </span>
            Jadwal kegiatan sekolah
          </div>
        </div>

        {/* KARTU 3: Status Server */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div>
            <p className="text-slate-300 text-sm font-medium mb-1">
              Status Sistem
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="text-xl font-semibold">Database Online</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300 mt-4">
            <Database size={16} /> Supabase Connection
          </div>
        </div>
      </div>

      {/* Bagian Quick Actions */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Aksi Cepat Admin
            </h3>
            <p className="text-slate-500 text-sm max-w-lg leading-relaxed">
              Segera perbarui informasi lowongan kerja atau tambahkan agenda
              kegiatan terbaru untuk siswa dan alumni.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Link to="/admin/loker/new" className="flex-1 md:flex-none">
              <button className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center gap-2 group">
                <Briefcase
                  size={18}
                  className="group-hover:-rotate-12 transition-transform"
                />
                Tambah Loker
              </button>
            </Link>
            <Link to="/admin/kegiatan/new" className="flex-1 md:flex-none">
              <button className="w-full md:w-auto bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group">
                <Calendar size={18} />
                Tambah Kegiatan
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
