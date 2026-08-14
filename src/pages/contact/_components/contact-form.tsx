import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 lg:p-12 rounded-2xl border border-accent/30 bg-accent/5 text-center"
      >
        <div className="size-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="size-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Message Sent Successfully
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Thank you for reaching out. Our team will review your inquiry and
          respond within 1-2 business days.
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", company: "", message: "" });
          }}
          className="bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 lg:p-8 rounded-2xl border border-border bg-card">
        <h2 className="text-xl font-bold text-foreground mb-1">
          Send Us a Message
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Fill out the form below and we{"'"}ll get back to you promptly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / Organization</Label>
            <Input
              id="company"
              name="company"
              placeholder="PT Your Company Name"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project requirements, timeline, and any specific needs..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 font-semibold cursor-pointer"
          >
            <Send className="size-4 mr-2" />
            Send Message
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
