import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import AppLayout from "./components/layout/app-layout.tsx";
import HomePage from "./pages/home/page.tsx";
import AboutPage from "./pages/about/page.tsx";
import ServicesPage from "./pages/services/page.tsx";
import ProjectsPage from "./pages/projects/page.tsx";
import ContactPage from "./pages/contact/page.tsx";
import TrainingPage from "./pages/training/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/training" element={<TrainingPage />} />
            {/* ADD CUSTOM ROUTES HERE */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
