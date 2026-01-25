import React from "react";
import { Link } from "react-router-dom"; // Pastikan install react-router-dom jika belum
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
  ExternalLink,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans relative overflow-hidden">
      {/* Decorative Top Highlight (Glow Effect) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Kolom 1: Brand & About (4 Kolom) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-bold text-xl shadow-lg shadow-violet-900/20">
                B
                <div className="absolute inset-0 rounded-xl bg-white/20 blur-[2px]"></div>
              </div>
              <div>
                <h3 className="font-bold text-2xl tracking-tight text-white leading-none">
                  BKK SMK
                </h3>
                <span className="text-sm font-medium text-violet-400 tracking-widest uppercase">
                  Diponegoro 1
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm pr-4">
              Jembatan masa depan karirmu. Kami menghubungkan talenta terbaik
              dari SMK Diponegoro 1 Jakarta dengan ratusan mitra industri
              terpercaya di seluruh Indonesia.
            </p>

            {/* Modern Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  color: "hover:bg-pink-600",
                },
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: Youtube,
                  href: "https://youtube.com",
                  color: "hover:bg-red-600",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  color: "hover:bg-sky-500",
                },
              ].map((Social, index) => (
                <a
                  key={index}
                  href={Social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 hover:text-white hover:-translate-y-1 ${Social.color}`}
                >
                  <Social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom 2: Navigasi (3 Kolom) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-violet-600 rounded-full"></span>
              Akses Cepat
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Beranda", path: "/" },
                { name: "Profil BKK", path: "/profil" },
                { name: "Info Kegiatan", path: "/kegiatan" },
                { name: "Lowongan Kerja", path: "/lowongan" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-sm text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    <ArrowRight
                      size={14}
                      className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Kontak (4 Kolom) */}
          <div className="md:col-span-4">
            <h4 className="font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-violet-600 rounded-full"></span>
              Hubungi Kami
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  Jalan Sunan Giri No. 5, Rawamangun, Kec. Pulo Gadung, Jakarta
                  Timur 13220
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  (021) 4702446
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-violet-600/20 group-hover:text-violet-400 transition-colors">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:smk_dipo01@yahoo.com"
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                >
                  smk_dipo01@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-slate-900 bg-slate-950/50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} BKK SMK Diponegoro 1. Dibuat
            dengan{" "}
            <Heart
              size={12}
              className="inline text-rose-500 mx-0.5 fill-rose-500"
            />{" "}
            di Jakarta.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 font-medium">
            <a href="#" className="hover:text-violet-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
