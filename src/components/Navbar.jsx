import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Menu, X, ChevronRight, LogIn } from "lucide-react";

// Pastikan path logo sesuai
import logoBkk from "../assets/logo yayasan al-hidayah-02.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Deteksi Scroll untuk mengubah style Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup mobile menu saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Logic: Apakah kita sedang di Homepage?
  const isHome = location.pathname === "/";

  // Logic: Navbar Transparan hanya jika di Home DAN belum di-scroll DAN menu mobile tertutup
  const isTransparent = isHome && !scrolled && !isOpen;

  // Class dinamis untuk Text & Button
  const navTextColor = isTransparent ? "text-white" : "text-slate-800";
  const logoTextSecondary = isTransparent ? "text-slate-300" : "text-slate-500";

  // Class untuk NavLink Desktop
  const getNavLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300 hover:opacity-100 ${
      isActive ? "font-bold opacity-100" : "opacity-80 hover:opacity-100"
    } ${
      isTransparent
        ? "text-white after:bg-white"
        : "text-slate-800 after:bg-violet-600"
    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isTransparent
            ? "bg-transparent py-6"
            : "bg-white/90 backdrop-blur-lg shadow-sm py-3 border-b border-slate-200/50"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* 1. LOGO BRANDING */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center p-1 transition-all duration-300 ${isTransparent ? "bg-white/10 backdrop-blur-sm border border-white/20" : "bg-white shadow-md border border-slate-100"}`}
            >
              <img
                src={logoBkk}
                alt="Logo BKK"
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-lg leading-none tracking-tight ${navTextColor}`}
              >
                SMK DIPO 1
              </span>
              <span
                className={`text-[10px] font-medium tracking-widest uppercase mt-1 ${logoTextSecondary}`}
              >
                Career Center
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {[
                { path: "/", label: "Beranda" },
                { path: "/profil", label: "Profil" },
                { path: "/lowongan", label: "Lowongan" },
                { path: "/kegiatan", label: "Kegiatan" },
                { path: "/mitra", label: "DU/DI" },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={getNavLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Separator Line */}
            <div
              className={`h-6 w-px ${isTransparent ? "bg-white/20" : "bg-slate-200"}`}
            ></div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-violet-600"
                }`}
              >
                <LogIn size={16} />
                <span>Masuk</span>
              </Link>

              <a
                href="https://smkdipo1jkt.vercel.app"
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
                  isTransparent
                    ? "bg-white text-violet-900 hover:bg-slate-100"
                    : "bg-violet-600 text-white hover:bg-violet-700 shadow-violet-200"
                }`}
              >
                Web Sekolah
              </a>
            </div>
          </div>

          {/* 3. MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-50 p-2 rounded-lg transition-colors active:scale-95 ${
              isOpen
                ? "text-slate-800 bg-slate-100"
                : `${navTextColor} hover:bg-white/10`
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* 4. MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center gap-8 p-6 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <nav className="flex flex-col items-center gap-6 w-full max-w-sm z-10">
            {[
              { path: "/", label: "Beranda" },
              { path: "/profil", label: "Profil BKK" },
              { path: "/lowongan", label: "Info Lowongan" },
              { path: "/kegiatan", label: "Agenda Kegiatan" },
              { path: "/mitra", label: "DU/DI" },
            ].map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-bold tracking-tight transition-all duration-300 flex items-center gap-3 ${
                    isActive
                      ? "text-violet-600 scale-105"
                      : "text-slate-400 hover:text-slate-800"
                  }`
                }
              >
                {link.label}
                {/* Active Indicator Dot */}
              </NavLink>
            ))}
          </nav>

          <div className="w-12 h-1 bg-slate-100 rounded-full"></div>

          <div className="flex flex-col gap-4 w-full max-w-xs z-10">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <LogIn size={18} />
              Login Admin
            </Link>
            <a
              href="https://smkdipo1jkt.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-violet-700 shadow-lg shadow-violet-200 transition-colors"
            >
              Kunjungi Web Sekolah
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
