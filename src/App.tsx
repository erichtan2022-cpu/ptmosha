import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { DefaultProviders } from "./components/providers/default.tsx";
import AnalyticsTracker from "./components/seo/analytics-tracker.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import AppLayout from "./components/layout/app-layout.tsx";
import HomePage from "./pages/home/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import ServicesPage from "./pages/services/page.tsx";
import ProjectsPage from "./pages/projects/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import TrainingPage from "./pages/training/page.tsx";
import ConsultantPage from "./pages/consultant/page.tsx";
import PendaftaranPage from "./pages/pendaftaran/page.tsx";
import VerifikasiSertifikatPage from "./pages/verifikasi-sertifikat/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <HelmetProvider>
      <DefaultProviders>
        <BrowserRouter>
          {/* Tracks page views on every route change for GA4 & Clarity */}
          <AnalyticsTracker />

          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />

            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/consultant" element={<ConsultantPage />} />

              {/* General & Dynamic registration routes */}
              <Route path="/pendaftaran" element={<PendaftaranPage />} />
              <Route path="/pendaftaran/:slug" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-training" element={<PendaftaranPage />} />

              {/* Direct QR code registration routes for all programs */}
              <Route path="/pendaftaran-corporate-esg-strategy" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-corporate-esg" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-esg" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-homer-pro" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-plts-commissioning" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-oil-gas-power-plant-offline" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-oil-gas-power-plant-online" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-mechanical-piping-commissioning" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-electrical-instrument-commissioning" element={<PendaftaranPage />} />

              <Route path="/verifikasi-sertifikat" element={<VerifikasiSertifikatPage />} />
              <Route path="/alumni" element={<VerifikasiSertifikatPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </HelmetProvider>
  );
}
