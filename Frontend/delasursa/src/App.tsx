import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// --- Componentele de Layout și Securitate ---
import MainLayout from './components/MainLayout'; // Layout-ul cu Header/Sidebar/Footer
import ProtectedRoute from './components/ProtectedRoute'; // Paznicul de rută
import ProductsPage from "./pages/ProductsPage.tsx";

// --- Paginile Publice ---
// (Presupunând că ai fișierele create, chiar dacă sunt goale)
// Noi am recreat aceste fișiere mai devreme
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// --- Pagini Placeholder (pentru test) ---
// Acestea vor fi paginile reale ale aplicației tale
const ProducerDashboard = () => <div style={{color: 'white', fontSize: '2rem', padding: '2rem'}}>Panou Producător (Protejat)</div>;
const AdminDashboard = () => <div style={{color: 'white', fontSize: '2rem', padding: '2rem'}}>Panou Admin (Super Protejat)</div>;
const HomePage = () => <div style={{color: 'white', fontSize: '2rem', padding: '2rem'}}>Pagina Principală (Publică)</div>;


function App() {
  return (
    <Routes>
      {/* --- Rute Publice (Fără Layout) --- */}
      {/* Acestea au propriul lor stil (ex: formular centrat) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inregistrare" element={<SignUpPage />} />
      <Route path="/resetare-parola" element={<ResetPasswordPage />} />


      {/* --- Rute Publice (Cu Layout) --- */}
      {/* Paginile pe care oricine le vede, dar care au Header/Footer/Sidebar */}
      {/* Folosim MainLayout pentru a înveli pagina Home */}
      <Route element={<MainLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/" element={<HomePage />} />
        {/* Aici vor veni /produse, /despre-noi, etc. */}
      </Route>


      {/* --- Rute Protejate (Cu Layout) --- */}
      {/* Aceste rute sunt învelite ȘI în Layout, ȘI în Paznic */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["PRODUCER", "ADMIN"]} />
        }
      >
        <Route element={<MainLayout />}>
          {/* Doar Producerii și Adminii pot vedea asta */}
          <Route path="/dashboard-producator" element={<ProducerDashboard />} />
          {/* Aici vei adăuga /produsele-mele, /comenzi, etc. */}
        </Route>
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]} />
        }
      >
        <Route element={<MainLayout />}>
          {/* Doar Adminii pot vedea asta */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* --- Orice alt URL care nu se potrivește --- */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;