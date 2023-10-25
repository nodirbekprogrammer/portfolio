import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/front/HomePage";
import AdminLayout from "./components/layout/admin";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import UsersPage from "./pages/admin/UsersPage";
import { useSelector } from "react-redux";
import PortfoliosPage from "./pages/admin/PortfoliosPage";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAuthenticated ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="portfolios" element={<PortfoliosPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<Navigate to="/ " />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
