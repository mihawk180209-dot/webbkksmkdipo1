import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { Loader2 } from "lucide-react"; // Ikon loading

// Components (Tetap eager load biar muncul duluan)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// --- LAZY LOAD PAGES ---
// Public Pages
const Home = lazy(() => import("./pages/Home"));
const Lowongan = lazy(() => import("./pages/Lowongan"));
const Profil = lazy(() => import("./pages/Profil"));
const Mitra = lazy(() => import("./pages/Mitra"));
const Kegiatan = lazy(() => import("./pages/Kegiatan"));
const DetailKegiatan = lazy(() => import("./pages/DetailKegiatan"));
const DetailLowongan = lazy(() => import("./pages/DetailLowongan"));
const Login = lazy(() => import("./pages/Login"));

// Admin Components & Pages
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageArtikel = lazy(() => import("./pages/admin/ManageArtikel"));
const FormArtikel = lazy(() => import("./pages/admin/FormArtikel"));
const ManageLoker = lazy(() => import("./pages/admin/ManageLoker"));
const FormLoker = lazy(() => import("./pages/admin/FormLoker"));
const ManageKegiatan = lazy(() => import("./pages/admin/ManageKegiatan"));
const FormKegiatan = lazy(() => import("./pages/admin/FormKegiatan"));
const ManageMitra = lazy(() => import("./pages/admin/ManageMitra"));

// Komponen Loading
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
    <Loader2 className="animate-spin text-blue-600 w-12 h-12 mb-4" />
    <p className="text-slate-500 font-medium animate-pulse">
      Memuat Halaman...
    </p>
  </div>
);

// Layout untuk Website Umum
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* Bungkus Routes dengan Suspense */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 1. HALAMAN LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* 2. PUBLIC WEBSITE */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/kegiatan" element={<Kegiatan />} />
            <Route path="/kegiatan/:id" element={<DetailKegiatan />} />
            <Route path="/lowongan" element={<Lowongan />} />
            <Route path="/lowongan/:id" element={<DetailLowongan />} />
            <Route path="/mitra" element={<Mitra />} />
          </Route>

          {/* 3. ADMIN PANEL */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />

              {/* Module Artikel */}
              <Route path="artikel" element={<ManageArtikel />} />
              <Route path="artikel/tambah" element={<FormArtikel />} />
              <Route path="artikel/edit/:id" element={<FormArtikel />} />

              {/* Module Loker */}
              <Route path="loker" element={<ManageLoker />} />
              <Route path="loker/new" element={<FormLoker />} />
              <Route path="loker/edit/:id" element={<FormLoker />} />

              {/* Module Kegiatan */}
              <Route path="kegiatan" element={<ManageKegiatan />} />
              <Route path="kegiatan/new" element={<FormKegiatan />} />
              <Route path="kegiatan/edit/:id" element={<FormKegiatan />} />

              {/* Module Mitra */}
              <Route path="mitra" element={<ManageMitra />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
