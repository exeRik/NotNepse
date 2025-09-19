import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import NavbarSimple from "./components/NavbarSimple";
import DashboardPage from "./pages/Dashboard";
import MarketDataPage from "./pages/MarketData";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import PortfolioPage from "./pages/PortfolioPage";
// import ReportsPage from "./pages/ReportsPage";
// import SettingsPage from "./pages/SettingsPage";

function AppContent() {
  const location = useLocation();

  // Define routes where navbar should be hidden
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {!hideNavbar && <NavbarSimple />}

      <main style={{ flex: 1, padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/market" element={<MarketDataPage />} />
          {/* <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Router>
        <AppContent />
      </Router>
    </MantineProvider>
  );
}

export default App;
