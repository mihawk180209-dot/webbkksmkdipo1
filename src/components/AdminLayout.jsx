import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronRight,
  User,
  Handshake, // Import icon Handshake untuk Mitra
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  // Update Page Title based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin") setPageTitle("Dashboard Overview");
    else if (path.includes("/loker")) setPageTitle("Manajemen Lowongan");
    else if (path.includes("/kegiatan")) setPageTitle("Agenda Kegiatan");
    else if (path.includes("/mitra"))
      setPageTitle("Mitra Industri"); // Judul Halaman Mitra
    else setPageTitle("Admin Panel");
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path
      ? "bg-violet-50 text-violet-700 font-semibold shadow-sm border-r-4 border-violet-600"
      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:pl-5";
  };

  const handleLogout = async () => {
    const confirm = window.confirm(
      "Apakah Anda yakin ingin keluar dari Admin Panel?",
    );

    if (confirm) {
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] font-sans text-slate-800 selection:bg-violet-200 selection:text-violet-900">
      {/* Background Decor Elements */}
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-100/50 to-transparent -z-10" />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl lg:shadow-none transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 text-white font-bold text-lg">
              A
              <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Admin<span className="text-violet-600">BKK</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
                Control Panel
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col justify-between h-[calc(100vh-5rem)] p-4 overflow-y-auto">
          <div className="space-y-1.5">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 mt-4">
              Menu Utama
            </p>

            <Link
              to="/admin"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 group ${isActive("/admin")}`}
            >
              <LayoutDashboard
                size={20}
                className={
                  location.pathname === "/admin"
                    ? "text-violet-600"
                    : "text-slate-400 group-hover:text-violet-600"
                }
              />
              Dashboard
            </Link>

            <Link
              to="/admin/loker"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 group ${isActive("/admin/loker")}`}
            >
              <Briefcase
                size={20}
                className={
                  location.pathname === "/admin/loker"
                    ? "text-violet-600"
                    : "text-slate-400 group-hover:text-violet-600"
                }
              />
              Kelola Lowongan
            </Link>

            <Link
              to="/admin/kegiatan"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 group ${isActive("/admin/kegiatan")}`}
            >
              <Calendar
                size={20}
                className={
                  location.pathname === "/admin/kegiatan"
                    ? "text-violet-600"
                    : "text-slate-400 group-hover:text-violet-600"
                }
              />
              Kelola Kegiatan
            </Link>

            {/* Link Baru: Kelola Mitra */}
            <Link
              to="/admin/mitra"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-300 group ${isActive("/admin/mitra")}`}
            >
              <Handshake
                size={20}
                className={
                  location.pathname === "/admin/mitra"
                    ? "text-violet-600"
                    : "text-slate-400 group-hover:text-violet-600"
                }
              />
              Mitra Industri
            </Link>
          </div>

          {/* ... Sisa Bottom Actions sama ... */}
          <div className="space-y-2 pt-6 border-t border-slate-100">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Sistem
            </p>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-500 rounded-lg hover:bg-white hover:shadow-md hover:text-violet-600 transition-all duration-200 border border-transparent hover:border-slate-100"
            >
              <Globe size={18} />
              Website Utama
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-500 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span>Logout</span>
              </div>
              <ChevronRight
                size={14}
                className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
              />
            </button>

            {/* User Profile Snippet */}
            <div className="mt-4 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <User size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  Administrator
                </p>
                <p className="text-xs text-slate-400 truncate">admin@bkk.com</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        {/* Header Desktop */}
        <header className="hidden lg:flex items-center justify-between h-20 px-8 bg-white/50 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{pageTitle}</h1>
            <p className="text-sm text-slate-500">
              Selamat datang kembali, Admin!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-violet-50 border border-violet-100 rounded-full text-xs font-medium text-violet-600 animate-pulse">
              Live Mode
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <span className="text-sm font-medium text-slate-500">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:hidden sticky top-0 z-30">
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            Admin BKK
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg active:scale-95 transition"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in-up">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
