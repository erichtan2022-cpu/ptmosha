import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header.tsx";
import Footer from "./footer.tsx";
import WhatsAppButton from "./whatsapp-button.tsx";

export default function AppLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
