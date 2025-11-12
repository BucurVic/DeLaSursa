import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import { AuthProvider } from "./components/auth/AuthContext";
import EmailConfirmationPage from "./components/auth/EmailConfirmationPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<EmailConfirmationPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
