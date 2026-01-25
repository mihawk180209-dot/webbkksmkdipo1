import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  ArrowLeft,
  Save,
  Loader2,
  Briefcase,
  Building2,
  AlignLeft,
  Info,
  MapPin,
  Banknote,
  GraduationCap,
  Clock,
} from "lucide-react";

const FormLoker = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    posisi: "",
    perusahaan: "",
    deskripsi: "",
    lokasi: "",
    gaji: "",
    pendidikan: "SMK / Sederajat",
    tipe_pekerjaan: "Full Time",
  });

  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (id) fetchLoker();
  }, [id]);

  const fetchLoker = async () => {
    setLoadingData(true);
    // BALIK KE TABLE 'lowongan'
    const { data } = await supabase
      .from("lowongan")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setFormData({
        posisi: data.posisi,
        perusahaan: data.perusahaan,
        deskripsi: data.deskripsi,
        lokasi: data.lokasi || "",
        gaji: data.gaji || "",
        pendidikan: data.pendidikan || "SMK / Sederajat",
        tipe_pekerjaan: data.tipe_pekerjaan || "Full Time",
      });
    }
    setLoadingData(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const payload = {
      posisi: formData.posisi,
      perusahaan: formData.perusahaan,
      deskripsi: formData.deskripsi,
      lokasi: formData.lokasi,
      gaji: formData.gaji,
      pendidikan: formData.pendidikan,
      tipe_pekerjaan: formData.tipe_pekerjaan,
    };

    let error;
    if (id) {
      // BALIK KE TABLE 'lowongan'
      const { error: updateError } = await supabase
        .from("lowongan")
        .update(payload)
        .eq("id", id);
      error = updateError;
    } else {
      // BALIK KE TABLE 'lowongan'
      const { error: insertError } = await supabase
        .from("lowongan")
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      alert("Gagal simpan: " + error.message);
    } else {
      navigate("/admin/loker");
    }
    setUploading(false);
  };

  if (loadingData)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Memuat data lowongan...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <Link
          to="/admin/loker"
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Lowongan" : "Tambah Lowongan Kerja"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Publikasikan informasi pekerjaan untuk alumni dan siswa.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Briefcase size={18} className="text-slate-400" /> Posisi
                  Jabatan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="posisi"
                  value={formData.posisi}
                  required
                  placeholder="Contoh: Staff Administrasi"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-slate-400" /> Nama
                  Perusahaan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="perusahaan"
                  value={formData.perusahaan}
                  required
                  placeholder="Contoh: PT. Astra Honda Motor"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-400" /> Lokasi
                  Penempatan
                </label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  placeholder="Contoh: Jakarta Timur"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Banknote size={18} className="text-slate-400" /> Estimasi
                  Gaji
                </label>
                <input
                  type="text"
                  name="gaji"
                  value={formData.gaji}
                  placeholder="Contoh: UMR / Kompetitif"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <GraduationCap size={18} className="text-slate-400" />{" "}
                  Pendidikan
                </label>
                <select
                  name="pendidikan"
                  value={formData.pendidikan}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 outline-none transition"
                >
                  <option value="SMK / Sederajat">SMK / Sederajat</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="Umum">Umum (Semua Jurusan)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Clock size={18} className="text-slate-400" /> Tipe Pekerjaan
                </label>
                <select
                  name="tipe_pekerjaan"
                  value={formData.tipe_pekerjaan}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-purple-500 outline-none transition"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Magang / PKL">Magang / PKL</option>
                  <option value="Kontrak">Kontrak</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <AlignLeft size={18} className="text-slate-400" /> Deskripsi &
                Kualifikasi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                rows="8"
                required
                placeholder="Tuliskan detail pekerjaan, tanggung jawab, dan kualifikasi yang dibutuhkan..."
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all resize-y leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 text-lg">Publikasi</h3>
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                uploading
                  ? "bg-slate-400 cursor-not-allowed shadow-none"
                  : "bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/30"
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} /> {id ? "Simpan Perubahan" : "Terbitkan"}
                </>
              )}
            </button>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <div className="flex items-start gap-3">
              <Info className="text-purple-600 mt-0.5 shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-purple-900 text-sm mb-1">
                  Tips Admin
                </h4>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Lengkapi data Lokasi, Gaji, dan Pendidikan agar lowongan lebih
                  menarik dan informatif bagi pelamar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLoker;
