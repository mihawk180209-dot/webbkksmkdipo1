import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Sesuaikan path
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek sesi saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Dengarkan perubahan (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Tampilkan loading saat mengecek ke server
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-teal-600 mb-2" size={40} />
        <p className="text-slate-500 text-sm">Memverifikasi akses...</p>
      </div>
    );
  }

  // Jika tidak ada sesi, tendang ke login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, lanjut
  return <Outlet />;
};

export default ProtectedRoute;
