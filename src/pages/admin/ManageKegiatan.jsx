import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  Loader2,
  CalendarDays,
} from "lucide-react";

const ManageKegiatan = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .order("tanggal_event", { ascending: true });

    if (error) {
      console.error("Error:", error);
    }

    setKegiatan(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus kegiatan ini? Data tidak bisa dikembalikan.")) {
      const { error } = await supabase.from("kegiatan").delete().eq("id", id);
      if (error) {
        alert("Gagal hapus!");
      } else {
        setKegiatan(kegiatan.filter((item) => item.id !== id));
      }
    }
  };

  // Helper untuk format tanggal Indonesia
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Kelola Kegiatan
          </h2>
          <p className="text-slate-500 mt-1">
            Daftar agenda acara dan kegiatan sekolah yang akan datang.
          </p>
        </div>
        <Link
          to="/admin/kegiatan/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={20} /> Tambah Kegiatan
        </Link>
      </div>

      {/* Kontainer Tabel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p>Memuat data kegiatan...</p>
          </div>
        ) : kegiatan.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-400">
              <CalendarDays size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Belum ada kegiatan
            </h3>
            <p className="text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
              Jadwal kegiatan kosong. Tambahkan agenda baru untuk ditampilkan di
              website.
            </p>
            <Link
              to="/admin/kegiatan/new"
              className="text-purple-600 font-semibold hover:text-purple-700 hover:underline"
            >
              Buat agenda baru &rarr;
            </Link>
          </div>
        ) : (
          /* Tabel Data Responsive */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Nama Event
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Waktu Pelaksanaan
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Lokasi
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {kegiatan.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <p className="font-bold text-slate-800 text-base">
                        {item.nama_event}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {formatDate(item.tanggal_event)}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.jam_mulai
                              ? `${item.jam_mulai} - ${
                                  item.jam_selesai || "Selesai"
                                }`
                              : "Waktu belum ditentukan"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <MapPin size={16} className="text-slate-400" />
                        {item.lokasi}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/admin/kegiatan/edit/${item.id}`}
                          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-white hover:text-purple-600 hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-white hover:text-red-600 hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageKegiatan;
