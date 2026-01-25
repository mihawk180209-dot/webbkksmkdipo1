import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase"; // Sesuaikan path import

const ManageArtikel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    let { data } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    setArticles(data || []);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin hapus artikel ini selamanya?")) {
      const { error } = await supabase.from("articles").delete().eq("id", id);

      if (error) {
        alert("Gagal hapus!");
      } else {
        setArticles(articles.filter((item) => item.id !== id));
      }
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <tbody>
            {articles.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-gray-800">{item.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/artikel/edit/${item.id}`}
                    className="text-blue-600 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArtikel;
