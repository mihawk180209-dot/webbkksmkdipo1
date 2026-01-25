import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabase";
import {
  Trash2,
  Plus,
  Building2,
  Loader2,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

const ManageMitra = () => {
  const [mitraList, setMitraList] = useState([]);
  const [newName, setNewName] = useState("");
  const [logoFile, setLogoFile] = useState(null); // State untuk file gambar
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null); // Ref untuk reset input file

  useEffect(() => {
    fetchMitra();
  }, []);

  const fetchMitra = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mitra")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setMitraList(data || []);
    setLoading(false);
  };

  // --- LOGIKA UPLOAD FILE ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi sederhana tipe file
      if (!file.type.startsWith("image/")) {
        alert("Mohon pilih file gambar (JPG, PNG, dsb).");
        return;
      }
      setLogoFile(file);
    }
  };

  const uploadLogo = async (file) => {
    // Membuat nama file unik (timestamp + nama asli dibersihkan)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload ke bucket 'mitra-logos'
    const { error: uploadError } = await supabase.storage
      .from("mitra-logos")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Ambil URL publik setelah berhasil upload
    const { data } = supabase.storage
      .from("mitra-logos")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };
  // ---------------------------

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert("Nama mitra wajib diisi.");
      return;
    }

    setUploading(true);

    try {
      let uploadedLogoUrl = null;

      // Jika ada file yang dipilih, upload dulu
      if (logoFile) {
        uploadedLogoUrl = await uploadLogo(logoFile);
      }

      // Simpan data ke database (termasuk URL logo jika ada)
      const { data, error } = await supabase
        .from("mitra")
        .insert([
          {
            nama_mitra: newName,
            logo_url: uploadedLogoUrl,
          },
        ])
        .select();

      if (error) throw error;

      // Sukses
      setMitraList([data[0], ...mitraList]);
      setNewName("");
      setLogoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input file HTML
    } catch (error) {
      alert("Gagal menambah mitra: " + error.message);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus mitra ini?")) return;

    // Catatan: Idealnya kita juga menghapus file gambar dari storage,
    // tapi untuk saat ini kita hapus datanya di tabel saja agar simpel.
    const { error } = await supabase.from("mitra").delete().eq("id", id);
    if (!error) {
      setMitraList(mitraList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Kelola Mitra Industri
        </h2>
        <p className="text-slate-500 mt-1">
          Tambahkan nama perusahaan dan logo.
        </p>
      </div>

      {/* Form Tambah Cepat */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Plus size={20} className="text-purple-600" /> Tambah Mitra Baru
        </h3>
        <form
          onSubmit={handleAdd}
          className="grid md:grid-cols-12 gap-4 items-start"
        >
          {/* Input Nama */}
          <div className="md:col-span-5 relative">
            <Building2
              className="absolute left-3 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Nama Perusahaan..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition font-medium"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>

          {/* Input File Logo */}
          <div className="md:col-span-5 relative">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" // Sembunyikan input asli
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className={`flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed rounded-xl cursor-pointer transition font-medium text-sm
                    ${logoFile ? "border-purple-400 bg-purple-50 text-purple-700" : "border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:border-slate-400"}`}
            >
              {logoFile ? (
                <>
                  <ImageIcon size={20} />
                  <span className="truncate">{logoFile.name}</span>
                </>
              ) : (
                <>
                  <UploadCloud size={20} />
                  Pilih Logo (Opsional)
                </>
              )}
            </label>
          </div>

          {/* Tombol Submit */}
          <div className="md:col-span-2">
            <button
              disabled={uploading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-400 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:shadow-none"
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Simpan</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* List Mitra */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">
          Daftar Mitra ({mitraList.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="animate-spin text-slate-400" size={32} />
            </div>
          ) : (
            mitraList.map((item) => (
              <div
                key={item.id}
                className="group bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:shadow-md transition relative"
              >
                {/* Preview Logo */}
                <div className="w-full h-24 bg-slate-50 rounded-lg flex items-center justify-center mb-3 p-2 overflow-hidden relative">
                  {item.logo_url ? (
                    <img
                      src={item.logo_url}
                      alt={item.nama_mitra}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 size={32} className="text-slate-300" />
                  )}
                  {/* Hapus Button (Hover) */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 bg-white/80 backdrop-blur hover:bg-red-50 p-1.5 rounded-lg transition opacity-0 group-hover:opacity-100"
                    title="Hapus Mitra"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <span className="font-bold text-slate-700 text-sm line-clamp-2">
                  {item.nama_mitra}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMitra;
