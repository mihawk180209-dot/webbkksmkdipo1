import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Loader2,
  UploadCloud,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

const FormKegiatan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama_event: "",
    tanggal_event: "",
    jam_mulai: "",
    jam_selesai: "",
    lokasi: "",
    deskripsi: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (id) fetchKegiatan();
  }, [id]);

  const fetchKegiatan = async () => {
    setLoadingData(true);
    const { data } = await supabase
      .from("kegiatan")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setFormData({
        nama_event: data.nama_event,
        tanggal_event: data.tanggal_event,
        jam_mulai: data.jam_mulai || "",
        jam_selesai: data.jam_selesai || "",
        lokasi: data.lokasi,
        deskripsi: data.deskripsi || "",
      });
      setCurrentImage(data.image_url);
    }
    setLoadingData(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let finalImageUrl = currentImage;

    if (imageFile) {
      const fileName = `event_${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("kegiatan-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Gagal upload gambar: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("kegiatan-images")
        .getPublicUrl(fileName);

      finalImageUrl = urlData.publicUrl;
    }

    const payload = {
      nama_event: formData.nama_event,
      tanggal_event: formData.tanggal_event,
      jam_mulai: formData.jam_mulai,
      jam_selesai: formData.jam_selesai,
      lokasi: formData.lokasi,
      deskripsi: formData.deskripsi,
      image_url: finalImageUrl,
    };

    let error;
    if (id) {
      const { error: updateError } = await supabase
        .from("kegiatan")
        .update(payload)
        .eq("id", id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("kegiatan")
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      alert("Gagal simpan: " + error.message);
    } else {
      navigate("/admin/kegiatan");
    }
    setUploading(false);
  };

  if (loadingData)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p>Memuat data kegiatan...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <Link
          to="/admin/kegiatan"
          className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-sm"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Isi detail agenda kegiatan sekolah atau BKK.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* KOLOM KIRI: INPUT UTAMA */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="space-y-6">
              {/* Nama Event */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Acara <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_event"
                  value={formData.nama_event}
                  required
                  placeholder="Contoh: Job Fair 2024"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                />
              </div>

              {/* Grid Waktu & Lokasi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" /> Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal_event"
                    value={formData.tanggal_event}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" /> Lokasi
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    value={formData.lokasi}
                    required
                    placeholder="Contoh: Aula Sekolah"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> Jam Mulai
                  </label>
                  <input
                    type="time"
                    name="jam_mulai"
                    value={formData.jam_mulai}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> Jam Selesai
                  </label>
                  <input
                    type="time"
                    name="jam_selesai"
                    value={formData.jam_selesai}
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Deskripsi Lengkap
                </label>
                <textarea
                  name="deskripsi"
                  rows="6"
                  value={formData.deskripsi}
                  required
                  placeholder="Jelaskan detail kegiatan..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all resize-y leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: SIDEBAR ACTIONS */}
        <div className="space-y-6">
          {/* Panel Publish */}
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
                  <Save size={20} />{" "}
                  {id ? "Simpan Perubahan" : "Terbitkan Event"}
                </>
              )}
            </button>
          </div>

          {/* Panel Upload Gambar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Poster / Banner Event
            </label>

            <div className="relative group">
              <div
                className={`w-full h-56 rounded-xl overflow-hidden border-2 ${
                  previewUrl || currentImage
                    ? "border-slate-200"
                    : "border-dashed border-slate-300 bg-slate-50"
                } flex flex-col items-center justify-center relative transition-colors group-hover:border-purple-400`}
              >
                {previewUrl || currentImage ? (
                  <>
                    <img
                      src={previewUrl || currentImage}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium flex items-center gap-2">
                        <UploadCloud size={18} /> Ganti Gambar
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ImageIcon size={24} />
                    </div>
                    <p className="text-sm font-medium text-slate-600">
                      Klik untuk upload
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Mendukung JPG, PNG
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            {(previewUrl || currentImage) && (
              <p className="text-xs text-center text-slate-400 mt-3">
                Gambar berhasil dipilih
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormKegiatan;
