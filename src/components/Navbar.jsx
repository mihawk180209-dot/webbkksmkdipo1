import React, { useState, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { Menu, LogIn } from "lucide-react";
import MobileMenu from "./MobileMenu"; // Import komponen baru

import logoBkk from "../assets/logo yayasan al-hidayah-02.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isTransparent = isHome && !scrolled && !isOpen;

  const navTextColor = isTransparent ? "text-white" : "text-slate-800";
  const logoTextSecondary = isTransparent ? "text-slate-300" : "text-slate-500";

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
          {/* LOGO BRANDING */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center p-1 transition-all duration-300 ${
                isTransparent
                  ? "bg-white/10 backdrop-blur-sm border border-white/20"
                  : "bg-white shadow-md border border-slate-100"
              }`}
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
                BKK DIPO 1
              </span>
              <span
                className={`text-[10px] font-medium tracking-widest uppercase mt-1 ${logoTextSecondary}`}
              >
                Career Center
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
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

            <div
              className={`h-6 w-px ${isTransparent ? "bg-white/20" : "bg-slate-200"}`}
            ></div>

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

          {/* MOBILE TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(true)} // Buka menu
            className={`md:hidden relative z-50 p-2 rounded-lg transition-colors active:scale-95 ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-slate-800 hover:bg-slate-100"
            }`}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Gunakan Komponen MobileMenu yang baru */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
