import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Ensure this import path is correct
import { Lock, User, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // --- SUPABASE LOGIN LOGIC ---
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // If login successful
      if (data.user) {
        navigate("/admin");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      setError("Email atau Password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-400/20 rounded-full blur-3xl -translate-y-1/2 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-purple-400/10 rounded-full blur-3xl translate-y-1/2 opacity-50 pointer-events-none"></div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 relative z-10">
        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="p-2 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            title="Kembali ke Website"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 mt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-2xl text-white shadow-lg shadow-purple-500/30 mb-6 transform rotate-3 hover:rotate-6 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Masuk untuk mengelola Dashboard Sekolah
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl text-center font-medium border border-red-100 animate-fade-in flex items-center justify-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User
                  className="text-slate-400 group-focus-within:text-purple-600 transition-colors"
                  size={20}
                />
              </div>
              <input
                type="text" // Changed type to email
                placeholder="Masukkan username" // Placeholder per screenshot
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between ml-1">
              <label className="block text-sm font-bold text-slate-700">
                Password
              </label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock
                  className="text-slate-400 group-focus-within:text-purple-600 transition-colors"
                  size={20}
                />
              </div>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98] flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SMK Diponegoro 1 Jakarta. <br />{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
