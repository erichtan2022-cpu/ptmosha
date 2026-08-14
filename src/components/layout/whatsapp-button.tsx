import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "6281261014705";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Halo PT Mosha Sinalsal Solusi, saya ingin bertanya tentang layanan Anda.")}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe57] hover:scale-110 transition-all duration-200 cursor-pointer"
    >
      <MessageCircle className="size-7 fill-current" />
    </a>
  );
}
