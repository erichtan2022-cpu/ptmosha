import { motion } from "motion/react";
import { MapPin, Phone, Mail, Building2, Clock } from "lucide-react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Office Location */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
          Office Location
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Headquarters
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Komplek Pertokoan Bukit Kemuning Blok DD3 No. 02, Batam,
                Kepulauan Riau, Post Code: 29437
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-muted-foreground">+6281261014705</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground break-all">
                ptmoshasinalsalsolusi@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="size-5 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Business Hours
              </p>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 08:00 - 17:00 WIB
              </p>
              <p className="text-sm text-muted-foreground">
                Saturday: 08:00 - 12:00 WIB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">
          Bank Details
        </h3>
        <div className="flex items-start gap-3">
          <Building2 className="size-5 text-accent mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Bank Central Asia (BCA)
            </p>
            <p className="text-sm text-muted-foreground">
              Account Number: <span className="font-mono font-medium text-foreground">3262681995</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Account Name: PT Mosha Sinalsal Solusi
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <iframe
          title="PT Mosha Sinalsal Solusi - Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.024!2d104.0489!3d1.0408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98970607d08e1%3A0x5cb6e8f20e05a8e!2sBukit%20Kemuning!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
          className="w-full h-56 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
