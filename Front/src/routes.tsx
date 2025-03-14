import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JSX } from "react";
import { Home } from "./pages/home";
import { Signup } from "./pages/auth/signup";
import { Signin } from "./pages/auth/signin";
import { Schedule } from "./pages/schedule";
import { Appointments } from "./pages/appointments";
import { Profile } from "./pages/profile";

const isAuthenticated = () => {
  // Lógica para verificar se o usuário está autenticado
  // Retorne true se o usuário estiver autenticado, caso contrário, false
  return true; // Substitua isso pela lógica real de autenticação
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/schedule" element={<PrivateRoute element={<Schedule />} />} />
        <Route path="/appointments" element={<PrivateRoute element={<Appointments />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      </Routes>
    </BrowserRouter>
  );
}