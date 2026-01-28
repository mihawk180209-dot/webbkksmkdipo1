// src/components/MobileMenu.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, LogIn, ChevronRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import gsap from "gsap";

const MobileMenu = ({ isOpen, onClose }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true });

      // Animasi Overlay (Fade In)
      timeline.current.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animasi Menu Slide (Slide from right)
      timeline.current.to(
        menuRef.current,
        {
          x: "0%",
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2",
      );

      // Animasi Header Menu
      timeline.current.from(
        ".mobile-header",
        {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      );

      // Animasi List Link (Stagger effect)
      timeline.current.from(
        ".mobile-link-item",
        {
          x: 50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.2)",
        },
        "-=0.2",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (timeline.current) {
      if (isOpen) {
        timeline.current.play();
        document.body.style.overflow = "hidden";
      } else {
        timeline.current.reverse();
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  const navLinks = [
    { path: "/", label: "Beranda" },
    { path: "/profil", label: "Profil BKK" },
    { path: "/lowongan", label: "Info Lowongan" },
    { path: "/kegiatan", label: "Agenda Kegiatan" },
    { path: "/mitra", label: "DU/DI" },
  ];

  return createPortal(
    <div ref={containerRef} className="absolute top-0 left-0 w-0 h-0 z-[9999]">
      {/* OVERLAY */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] invisible opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MENU CONTAINER */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl z-[10000] translate-x-full"
      >
        {/* Header */}
        <div className="mobile-header flex items-center justify-between p-4 border-b border-slate-100">
          <span className="text-lg font-bold text-violet-600">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="h-full overflow-y-auto pb-20 p-2">
          {navLinks.map((link, idx) => (
            <div key={idx} className="mobile-link-item">
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) => `
                  block py-3.5 px-4 font-semibold rounded-xl transition-all
                  ${
                    isActive
                      ? "bg-violet-50 text-violet-600 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {link.label}
              </NavLink>
            </div>
          ))}

          <div className="mobile-link-item my-4 border-t border-slate-100 mx-4"></div>

          {/* Login Button */}
          <div className="mobile-link-item px-2">
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center gap-3 py-3.5 px-4 font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <LogIn size={20} className="text-violet-500" />
              Login Admin
            </Link>
          </div>

          {/* Web Sekolah Button */}
          <div className="mobile-link-item mt-6 px-4">
            <a
              href="https://smkdipo1jkt.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95"
            >
              Kunjungi Web Sekolah
              <ChevronRight size={18} />
            </a>
          </div>
        </nav>
      </div>
    </div>,
    document.body,
  );
};

export default MobileMenu;
