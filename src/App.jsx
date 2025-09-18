import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import NavbarSimple from "./components/NavbarSimple";

import DashboardPage from "./pages/Dashboard";
import MarketDataPage from "./pages/MarketData";
// import PortfolioPage from "./pages/PortfolioPage";
// import ReportsPage from "./pages/ReportsPage";
// import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <Router>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <NavbarSimple />

          <main style={{ flex: 1, padding: "2rem" }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/market" element={<MarketDataPage />} />
              {/* <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;
