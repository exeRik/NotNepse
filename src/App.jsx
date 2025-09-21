import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Helmet, HelmetProvider } from "react-helmet-async";

import NavbarSimple from "./components/NavbarSimple";

import Dashboard from "./pages/Dashboard";
import MarketData from "./pages/MarketData";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PortfolioPage from "./pages/Portfolio";
import SettingsPage from "./pages/Settings";

function AppContent() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Define routes where navbar should be hidden
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Dynamic page titles
  const pageTitles = {
    "/": "Login ",
    "/login": "Login ",
    "/signup": "Signup ",
    "/dashboard": "Dashboard ",
    "/market": "Market Data ",
    "/portfolio": "Portfolio ",
    "/settings": "Settings ",
  };

  return (
    <>
      {/* Dynamic Helmet */}
      <Helmet>
        <title>{pageTitles[location.pathname] || "Stock App"}</title>
        <meta
          name="description"
          content={
            location.pathname === "/dashboard"
              ? "View market overview, charts, and recent transactions on your stock dashboard."
              : location.pathname === "/market"
              ? "Explore full market data, stock charts, and analysis."
              : location.pathname === "/portfolio"
              ? "Manage and track your portfolio with real-time updates."
              : location.pathname === "/settings"
              ? "Update your account settings and preferences."
              : "Stock App"
          }
        />
      </Helmet>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {!hideNavbar && <NavbarSimple />}

        <main
          style={{
            flex: 1,
            padding: "2rem",
            marginLeft: !hideNavbar && !isMobile ? "320px" : 0,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market" element={<MarketData />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router>
          <AppContent />
        </Router>
      </MantineProvider>
    </HelmetProvider>
  );
}

export default App;
