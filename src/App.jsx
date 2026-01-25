import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Lowongan from "./pages/Lowongan";
import Profil from "./pages/Profil";
import Mitra from "./pages/Mitra";
import Kegiatan from "./pages/Kegiatan";
import DetailKegiatan from "./pages/DetailKegiatan";
import DetailLowongan from "./pages/DetailLowongan";
import Login from "./pages/Login";

// Admin Components & Pages
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageArtikel from "./pages/admin/ManageArtikel";
import FormArtikel from "./pages/admin/FormArtikel";
import ManageLoker from "./pages/admin/ManageLoker";
import FormLoker from "./pages/admin/FormLoker";
import ManageKegiatan from "./pages/admin/ManageKegiatan";
import FormKegiatan from "./pages/admin/FormKegiatan";
import ManageMitra from "./pages/admin/ManageMitra"; // (1) IMPORT INI

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

            {/* Module Mitra (BARU) */}
            <Route path="mitra" element={<ManageMitra />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
