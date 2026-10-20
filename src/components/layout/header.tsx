import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

const LOGO_URL = "https://hercules-cdn.com/file_hefyWjrnJQZ3depHrmPx78nx";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Training List", path: "/training" },
  { label: "Consultant List", path: "/consultant" },
  { label: "Pembayaran", path: "/pendaftaran" },
  { label: "Verifikasi Sertifikat", path: "/verifikasi-sertifikat" },
  { label: "Contact", path: "/contact" },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 lg:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0">
            <img
              src={LOGO_URL}
              alt="MSS Logo"
              className="h-9 w-auto shrink-0"
            />
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm sm:text-base font-bold tracking-wide text-primary-foreground leading-tight">
                PT MOSHA SINALSAL SOLUSI
              </span>
              <span className="text-[10px] text-primary-foreground/70 tracking-wider uppercase leading-tight mt-0.5">
                Local Company | Global Capabilities
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-2.5 2xl:px-3 py-1.5 text-xs 2xl:text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap",
                  location.pathname === link.path
                    ? "text-accent bg-primary-foreground/10"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="ml-2 2xl:ml-3 shrink-0">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cursor-pointer text-xs 2xl:text-sm px-3.5"
              >
                Get a Quote
              </Button>
            </Link>
          </nav>

          {/* Mobile / Tablet Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden text-primary-foreground p-2 cursor-pointer rounded-md hover:bg-primary-foreground/10 shrink-0"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-primary border-t border-primary-foreground/10 shadow-2xl">
          <nav className="flex flex-col px-4 py-3 gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-md transition-colors cursor-pointer",
                  location.pathname === link.path
                    ? "text-accent bg-primary-foreground/10"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cursor-pointer"
              >
                Get a Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
