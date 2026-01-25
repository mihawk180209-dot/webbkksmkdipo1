import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { ArrowLeft, Upload, Image as ImageIcon, Save } from "lucide-react";

const FormArtikel = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    category: "Berita",
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Untuk preview file baru
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    setLoadingData(true);
    const { data } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      setFormData({
        title: data.title,
        category: data.category,
        content: data.content,
      });
      setCurrentImage(data.image_url);
    }
    setLoadingData(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Buat preview lokal
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let finalImageUrl = currentImage;

    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("article-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Gagal upload: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("article-images")
        .getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const payload = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      image_url: finalImageUrl,
    };

    let error;
    if (id) {
      const { error: updateError } = await supabase
        .from("articles")
        .update(payload)
        .eq("id", id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("articles")
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      alert("Gagal simpan: " + error.message);
    } else {
      navigate("/admin/artikel");
    }
    setUploading(false);
  };

  if (loadingData)
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Form */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/admin/artikel"
          className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {id ? "Edit Artikel" : "Buat Artikel Baru"}
          </h2>
          <p className="text-sm text-gray-500">
            Isi formulir di bawah ini untuk mempublikasikan konten.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Kolom Kiri: Input Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  required
                  placeholder="Masukkan judul menarik..."
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Konten
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  rows="12"
                  required
                  placeholder="Tulis isi artikel di sini..."
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white transition outline-none resize-y"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Sidebar Options */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Kategori
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="Berita">Berita</option>
                <option value="Prestasi">Prestasi</option>
                <option value="Pengumuman">Pengumuman</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gambar Unggulan
            </label>

            {/* Preview Area */}
            <div className="mb-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden h-48 relative group">
              {previewUrl || currentImage ? (
                <img
                  src={previewUrl || currentImage}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <span className="text-xs text-gray-400">
                    Belum ada gambar
                  </span>
                </div>
              )}
            </div>

            <label className="block w-full cursor-pointer">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2.5 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-teal-50 file:text-teal-700
                  hover:file:bg-teal-100 transition
                "
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Menyimpan...
              </span>
            ) : (
              <>
                <Save size={20} /> Simpan Artikel
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormArtikel;
