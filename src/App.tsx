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
              <Route path="/pendaftaran" element={<PendaftaranPage />} />
              <Route path="/pendaftaran-training" element={<PendaftaranPage />} />
              {/* ADD CUSTOM ROUTES HERE */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DefaultProviders>
    </HelmetProvider>
  );
}
