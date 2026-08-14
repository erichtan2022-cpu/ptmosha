import PageHero from "@/components/layout/page-hero.tsx";
import { motion } from "motion/react";
import ContactForm from "./_components/contact-form.tsx";
import ContactInfo from "./_components/contact-info.tsx";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1758518729240-7162d07427b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzIwMTN8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBtZWV0aW5nJTIwaGFuZHNoYWtlJTIwYnVzaW5lc3MlMjBwYXJ0bmVyc2hpcHxlbnwwfHx8fDE3ODYyOTc3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Get In Touch"
        title="Kontak Kami"
        description="Ready to discuss your next project? Reach out to our team for a consultation or request a quote."
        image={HERO_IMAGE}
      />

      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
