import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

const LOGO_URL = "https://hercules-cdn.com/file_hefyWjrnJQZ3depHrmPx78nx";

const QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="MSS Logo"
                className="h-10 w-auto"
              />
              <h3 className="text-lg font-bold">PT Mosha Sinalsal Solusi</h3>
            </div>
            <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-2">
              Local Company | Global Capabilities
            </p>
            <p className="text-sm font-semibold text-accent mb-3">
              Training, Konsultan &amp; Supply Manpower
            </p>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Providing turnkey system solutions from concept, engineering,
              installation, to maintenance since 2021.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  Komplek Pertokoan Bukit Kemuning Blok DD3 No. 02, Batam,
                  Kepulauan Riau, 29437
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/70">
                  +6281261014705
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="size-4 mt-0.5 text-accent shrink-0" />
                <div className="space-y-0.5">
                  <span className="block text-sm text-primary-foreground/70 break-all">
                    staff@moshassolusi.com
                  </span>
                  <span className="block text-sm text-primary-foreground/70 break-all">
                    emosag@moshassolusi.com
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Bank Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
              Bank Details
            </h4>
            <div className="flex items-start gap-2">
              <Building2 className="size-4 mt-0.5 text-accent shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary-foreground/90">
                  Bank BCA
                </p>
                <p className="text-sm text-primary-foreground/70">
                  Account: 3262681995
                </p>
                <p className="text-sm text-primary-foreground/70">
                  PT Mosha Sinalsal Solusi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/50">
              &copy; {currentYear} PT Mosha Sinalsal Solusi. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/50">
              Engineering Excellence Since 2021
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
