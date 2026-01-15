import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// --- Componentele de Layout și Securitate ---
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProducerProductsPage from "./pages/ProducerPage.tsx";
import ProductForm from "./components/AddProductForm.tsx";
import ProducerLayout from "./components/ProducerLayout.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";

// --- Paginile Publice ---
import SignUpPage from "./pages/auth/SignUpPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.tsx";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.tsx";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminUsersPage from "./pages/admin/AdminUsersPage.tsx";
import UserProducerPage from "./pages/UserProducerPage.tsx";
import ProducersPage from "./pages/ProducersPage.tsx";

// --- Pagini Placeholder / Reale ---
import CheckoutPage from "./pages/CheckoutPage";
import BecomeProducerPage from "./pages/BecomeProducerPage.tsx";
import ClientOrderPage from "./pages/ClientOrderPage.tsx";
import ProducerOrderPage from "./pages/ProducerOrderPage.tsx";
import MyAccountPage from "./pages/MyAccountPage.tsx";
import EditAccountPage from "./pages/EditAccountPage.tsx";
import ProducerReceivedOrders from "./pages/ProducerReceivedOrders.tsx";
import ProducerDashboardMain from "./pages/ProducerDashboardMain.tsx";
import MyOrdersPage from "./pages/MyOrdersPage.tsx";
import MySubscriptionsPage from "./pages/MySubscriptionsPage.tsx";
import SubscriptionPage from "./pages/BundlesPage.tsx";
import BundleDetailsPage from "./pages/BundleDetailsPage.tsx";
import ProducerBundlesPage from "./pages/ProducerBundlesPage.tsx";
import ProducerSubscriptionsPage from "./pages/ProducerSubscriptionsPage.tsx";

function App() {
  return (
    <Routes>
      {/* --- Rute Publice (Fără Layout) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inregistrare" element={<SignUpPage />} />
      <Route
        path="/resetare-parola/:passwordToken"
        element={<ResetPasswordPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* --- RUTE COMUNE PROTEJATE (Accesibile oricărui utilizator logat) --- */}
      {/* Aici sunt Contul Meu și Editarea, mutate corect sub protecție */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["CLIENT", "PRODUCATOR", "ADMIN"]} />
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/contul-meu" element={<MyAccountPage />} />
          <Route path="/edit-account" element={<EditAccountPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/abonamentele-mele" element={<MySubscriptionsPage />} />
          <Route path="/my-orders/:id" element={<ClientOrderPage />} />
        </Route>
      </Route>

      {/* --- Rute Publice (Cu Layout) --- */}
      <Route element={<MainLayout />}>
        <Route path="/produse" element={<ProductsPage />} />
        <Route path="/pachete" element={<SubscriptionPage />} />
        <Route path="/pachete/:id" element={<BundleDetailsPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/producer/:producerId" element={<UserProducerPage />} />
        <Route path="/become-producer" element={<BecomeProducerPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cos-de-cumparaturi" element={<CartPage />} />
        <Route path="/produse/:id" element={<ProductDetailsPage />} />
        {/* Checkout și Comenzi */}
        <Route path="/checkout" element={<CheckoutPage />} />{" "}
        {/* schimb cand am cosul, e doar de test */}
      </Route>

      {/* --- Rute Protejate PRODUCĂTOR --- */}
      <Route element={<ProtectedRoute allowedRoles={["PRODUCATOR"]} />}>
        <Route element={<ProducerLayout />}>
          <Route
            path="/dashboard-producator"
            element={<ProducerDashboardMain />}
          />
          <Route path="/order-producer/:id" element={<ProducerOrderPage />} />

          <Route
            path="/dashboard-producator/produse"
            element={<ProducerProductsPage />}
          >
            <Route index element={<Navigate to="lista" replace />} />
            <Route path="lista" element={<ProductListPage />} />
            <Route path="adauga" element={<ProductForm />} />
            <Route path="inventar" element={<InventoryPage />} />
          </Route>

          <Route
            path="/dashboard-producator/comenzi-primite"
            element={<ProducerReceivedOrders />}
          />

          <Route
            path="/dashboard-producator/comenzi-primite/:id"
            element={<ProducerOrderPage />}
          />
          <Route
            path="/dashboard-producator/pachete"
            element={<ProducerBundlesPage />}
          />
            <Route
                path="/dashboard-producator/abonamente"
                element={<ProducerSubscriptionsPage />}
            />
        </Route>
      </Route>

      {/* --- Rute Protejate ADMIN --- */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
        </Route>
      </Route>

      {/* --- Catch-all --- */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
