import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// --- Componentele de Layout și Securitate ---
import MainLayout from "./components/MainLayout"; // Layout-ul cu Header/Sidebar/Footer
import ProtectedRoute from "./components/ProtectedRoute"; // Paznicul de rută
import ProductsPage from "./pages/ProductsPage.tsx";
import ProducerProductsPage from "./pages/ProducerPage.tsx";
import ProductForm from "./components/AddProductForm.tsx";
import ProducerLayout from "./components/ProducerLayout.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';

// --- Paginile Publice ---
// (Presupunând că ai fișierele create, chiar dacă sunt goale)
// Noi am recreat aceste fișiere mai devreme
import SignUpPage from './pages/auth/SignUpPage.tsx';
import LoginPage from './pages/auth/LoginPage.tsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.tsx';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import AdminLayout from './pages/admin/AdminLayout';
import AdminUsersPage from "./pages/admin/AdminUsersPage.tsx";
import UserProducerPage from "./pages/UserProducerPage.tsx";

// --- Pagini Placeholder (pentru test) ---
// Acestea vor fi paginile reale ale aplicației tale
import CheckoutPage from "./pages/CheckoutPage";
import BecomeProducerPage from "./pages/BecomeProducerPage.tsx";
import ClientOrderPage from "./pages/ClientOrderPage.tsx";
import ProducerOrderPage from "./pages/ProducerOrderPage.tsx";

function App() {
  return (
    <Routes>
      {/* --- Rute Publice (Fără Layout) --- */}
      {/* Acestea au propriul lor stil (ex: formular centrat) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inregistrare" element={<SignUpPage />} />
      <Route path="/resetare-parola" element={<ResetPasswordPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* --- Rute Publice (Cu Layout) --- */}
      {/* Paginile pe care oricine le vede, dar care au Header/Footer/Sidebar */}
      {/* Folosim MainLayout pentru a înveli pagina Home */}
      <Route element={<MainLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/producer/:producerId" element={<UserProducerPage />} />
          <Route path="/become-producer" element={<BecomeProducerPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* Aici vor veni /produse, /despre-noi, etc. */}
          <Route path="/checkout" element={<CheckoutPage />} /> // schimb cand am cosul, e doar de test

          <Route path="/order/:id" element={<ClientOrderPage />} />
          <Route path="/order-producer/:id" element={<ProducerOrderPage />} />
        {/* Aici vor veni /produse, /despre-noi, etc. */}
      </Route>

      {/* --- Rute Protejate (Cu Layout) --- */}
      {/* Aceste rute sunt învelite ȘI în Layout, ȘI în Paznic */}
      <Route element={<ProtectedRoute allowedRoles={["PRODUCATOR"]} />}>
        <Route element={<ProducerLayout />}>
          <Route
            path="/dashboard-producator"
            element={<Navigate to="/dashboard-producator/produse/lista" />}
          />

                {/* pagina cu tab-uri */}
                <Route path="/dashboard-producator/produse" element={<ProducerProductsPage />}>
                    <Route path="lista" element={<ProductListPage />} />
                    <Route path="adauga" element={<ProductForm />} />
                     <Route path="inventar" element={<InventoryPage />} />
                    {/* <Route path="promotii" element={<PromotionsPage />} /> */}
                </Route>

            </Route>
        </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
        </Route>
      </Route>

      {/* --- Orice alt URL care nu se potrivește --- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
