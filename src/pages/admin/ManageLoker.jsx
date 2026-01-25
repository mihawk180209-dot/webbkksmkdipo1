import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  Plus,
  Briefcase,
  Building2,
  Pencil,
  Trash2,
  Loader2,
  SearchX,
} from "lucide-react";

const ManageLoker = () => {
  const [loker, setLoker] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoker();
  }, []);

  const fetchLoker = async () => {
    setLoading(true);
    // BALIK KE TABLE 'lowongan'
    let { data, error } = await supabase
      .from("lowongan")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error:", error);
    }

    setLoker(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus lowongan ini? Data tidak bisa dikembalikan.")) {
      // BALIK KE TABLE 'lowongan'
      const { error } = await supabase.from("lowongan").delete().eq("id", id);
      if (error) {
        alert("Gagal hapus!");
      } else {
        setLoker(loker.filter((item) => item.id !== id));
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Kelola Lowongan
          </h2>
          <p className="text-slate-500 mt-1">
            Daftar pekerjaan yang tersedia untuk alumni dan siswa.
          </p>
        </div>
        <Link
          to="/admin/loker/new"
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={20} /> Tambah Loker
        </Link>
      </div>

      {/* Kontainer Tabel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p>Memuat data lowongan...</p>
          </div>
        ) : loker.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-400">
              <SearchX size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Belum ada lowongan
            </h3>
            <p className="text-slate-500 max-w-sm mt-2 mb-8 leading-relaxed">
              Saat ini belum ada data lowongan kerja yang dipublikasikan.
            </p>
            <Link
              to="/admin/loker/new"
              className="text-purple-600 font-semibold hover:text-purple-700 hover:underline"
            >
              Buat lowongan baru &rarr;
            </Link>
          </div>
        ) : (
          /* Tabel Data Responsive */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Posisi
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Perusahaan
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Deskripsi Singkat
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loker.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                          <Briefcase size={18} />
                        </div>
                        <span className="font-bold text-slate-800 text-base">
                          {item.posisi}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 size={16} className="text-slate-400" />
                        <span className="font-medium">{item.perusahaan}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm max-w-xs truncate">
                      {item.deskripsi
                        ? item.deskripsi.substring(0, 60) +
                          (item.deskripsi.length > 60 ? "..." : "")
                        : "-"}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/admin/loker/edit/${item.id}`}
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

export default ManageLoker;
