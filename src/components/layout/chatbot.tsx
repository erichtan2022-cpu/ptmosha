import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Send,
  RotateCcw,
  Sparkles,
  PhoneCall,
  User,
  Minimize2,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Award,
  Clock,
  ExternalLink,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export interface RecommendationCardData {
  trainingId: string;
  topic: string;
  category: string;
  level: string;
  duration: string;
  mode: string;
  certification: string;
  url: string;
  score: number;
  matchedReasons: string[];
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  recommendations?: RecommendationCardData[];
  options?: string[];
  actionLink?: {
    label: string;
    url: string;
  };
}

const WHATSAPP_TRAINING_NUMBER = "6282268195332";
const WHATSAPP_TRAINING_NUMBER_2 = "6282392907198";
const WHATSAPP_TRAINING_URL = `https://wa.me/${WHATSAPP_TRAINING_NUMBER}?text=${encodeURIComponent(
  "Halo Admin Training PT Mosha, saya ingin berkonsultasi mengenai pendaftaran pelatihan."
)}`;
const REGISTRATION_LINK_PLTS = "https://bit.ly/3T6EePy";
const REGISTRATION_LINK_OIL_GAS = "https://bit.ly/4cz9xct";
const REGISTRATION_LINK = "https://bit.ly/3T6EePy";

const QUICK_ACTIONS = [
  "🎓 Cari pelatihan yang cocok",
  "📚 Lihat semua pelatihan",
  "💼 Pelatihan untuk karier saya",
  "📜 Cari sertifikasi BNSP / KEBTKE",
  "❓ Tanya jam & jadwal terdekat",
];

// Helper: Wrap a Promise with a strict timeout so UI never hangs indefinitely
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("REQUEST_TIMEOUT"));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");

  // User profile state stored during active chat session
  const [userProfile, setUserProfile] = useState<{
    role?: string;
    interest?: string;
    goal?: string;
  }>({});

  // Persist sessionId in localStorage
  const [sessionId] = useState<string>(() => {
    const saved = localStorage.getItem("mosha_chat_session_id");
    if (saved) return saved;
    const newId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("mosha_chat_session_id", newId);
    return newId;
  });

  // Safe Convex hooks
  const chatAction = useAction(api.ai.chatWithMoshaAI);
  const clearSession = useMutation(api.sessions.clearSessionHistory);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text:
        "Halo! Selamat datang di **PT Mosha Sinalsal Solusi (MSS)** 🤖\n" +
        "*Tagline: Local Company | Global Capabilities*\n\n" +
        "Saya **Mosha AI Assistant**, Virtual Training & Certification Consultant Anda.\n\n" +
        "Saya siap membantu menganalisis latar belakang Anda dan merekomendasikan program pelatihan & sertifikasi resmi yang paling relevan.\n\n" +
        "Silakan pilih menu di bawah atau ketik pertanyaan Anda:",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: QUICK_ACTIONS,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isTyping) return;

    setErrorMessage(null);
    setLastUserMessage(messageText);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      // Attempt Convex Backend Action with a 25s strict timeout
      // (Convex needs time: save to DB → fetch history → call OpenRouter AI → save response)
      const result = await withTimeout(
        chatAction({
          sessionId,
          userMessage: messageText,
        }),
        25000
      );

      // Bot message from Convex
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendations: result.recommendations && result.recommendations.length > 0 ? result.recommendations : undefined,
        options: result.recommendations && result.recommendations.length > 0
          ? ["💬 Konsultasi Jadwal via WA", "📝 Daftar via Form Online", "🔍 Cari Topik Lain"]
          : QUICK_ACTIONS.slice(0, 3),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      // Instant Smart Consultant Fallback (Runs if Convex is offline / disconnected / slow)
      const smartReply = generateSmartConsultantResponse(messageText, userProfile, setUserProfile);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: smartReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendations: smartReply.recommendations && smartReply.recommendations.length > 0 ? smartReply.recommendations : undefined,
        options: smartReply.options,
        actionLink: smartReply.actionLink,
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = async () => {
    try {
      await clearSession({ sessionId });
    } catch (e) {
      // Ignore if offline
    }
    setUserProfile({});

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text:
          "Percakapan telah diperbarui. Halo! Saya **Mosha AI Assistant**, siap membantu menganalisis kebutuhan pelatihan dan sertifikasi Anda.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: QUICK_ACTIONS,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-slate-900 text-white shadow-2xl hover:shadow-slate-900/40 transition-all cursor-pointer border border-slate-700/50"
          aria-label="Buka AI Training Consultant Mosha"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="size-6 text-emerald-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-sm font-semibold text-white hidden sm:inline-block">
            AI Training Consultant
          </span>
          {unreadCount > 0 && (
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
              {unreadCount}
            </span>
          )}
        </motion.button>
      )}

      {/* Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[92vw] sm:w-[430px] h-[610px] max-h-[85vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative bg-slate-800 p-2 rounded-xl border border-slate-700">
                  <Bot className="size-6 text-emerald-400" />
                  <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-400 rounded-full border border-slate-900"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm leading-none text-white">
                      Mosha AI Consultant
                    </h3>
                    <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400"></span>
                    Local Company | Global Capabilities
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Mulai Ulang Percakapan"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Tutup Chat"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Minimize2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Error Notification Bar */}
            {errorMessage && (
              <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 py-2 text-[11px] text-amber-600 dark:text-amber-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {errorMessage}
                </span>
                <button
                  onClick={() => handleSendMessage(lastUserMessage)}
                  className="underline font-semibold hover:text-amber-700 cursor-pointer ml-2 shrink-0"
                >
                  Coba lagi
                </button>
              </div>
            )}

            {/* Chat Body / Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-secondary/30 scrollbar-thin scrollbar-thumb-muted">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`flex gap-2 max-w-[90%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                  >
                    <div
                      className={`size-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${msg.sender === "user"
                        ? "bg-slate-900 text-white"
                        : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        }`}
                    >
                      {msg.sender === "user" ? (
                        <User className="size-4 text-white" />
                      ) : (
                        <Bot className="size-4 text-emerald-500" />
                      )}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-tr-none"
                        : "bg-card border border-border text-foreground rounded-tl-none"
                        }`}
                    >
                      {/* Markdown Text Render */}
                      <RenderMarkdown content={msg.text} />

                      {/* Recommendation Cards Component */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="mt-3 space-y-3 pt-2 border-t border-border/60">
                          <p className="font-semibold text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="size-3" />
                            Rekomendasi Pelatihan Relevan:
                          </p>
                          {msg.recommendations.map((rec, rIdx) => (
                            <RecommendationCard key={rIdx} card={rec} />
                          ))}
                        </div>
                      )}

                      {/* Action Button Link */}
                      {msg.actionLink && (
                        <a
                          href={msg.actionLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-between gap-2 px-3 py-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-medium rounded-lg text-xs transition-colors shadow-xs"
                        >
                          <span className="flex items-center gap-1.5">
                            <PhoneCall className="size-3.5" />
                            {msg.actionLink.label}
                          </span>
                          <ChevronRight className="size-3.5" />
                        </a>
                      )}

                      <span className="block text-[9px] text-muted-foreground mt-1.5 text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Quick Action Suggestion Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 pl-9">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(opt)}
                          disabled={isTyping}
                          className="text-[11px] bg-card hover:bg-slate-900 hover:text-white border border-border text-muted-foreground px-2.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-left flex items-center gap-1 shadow-2xs disabled:opacity-50"
                        >
                          <BookOpen className="size-3 text-emerald-500 shrink-0" />
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 pl-2">
                  <div className="size-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Bot className="size-4 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="p-3 bg-card border border-border rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[11px] ml-1">Menganalisis kebutuhan & katalog PT Mosha...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-card border-t border-border flex flex-col gap-2">
              <div className="flex items-end gap-2 bg-secondary/50 rounded-xl p-2 border border-border">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan atau latar belakang Anda..."
                  disabled={isTyping}
                  rows={1}
                  className="flex-1 bg-transparent resize-none border-none outline-hidden text-xs text-foreground placeholder:text-muted-foreground max-h-20 min-h-[34px] py-1 px-1"
                />
                <Button
                  size="icon"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="size-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shrink-0 cursor-pointer disabled:opacity-40"
                >
                  <Send className="size-4 text-emerald-400" />
                </Button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
                <span>Tekan Enter untuk kirim • Shift+Enter baris baru</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Data Resmi PT Mosha</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RecommendationCard({ card }: { card: RecommendationCardData }) {
  return (
    <div className="bg-card/80 border border-emerald-500/30 rounded-xl p-3 shadow-xs space-y-2 text-left">
      {/* Header Badge & Title */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-xs text-foreground leading-snug">
          🎓 {card.topic}
        </h4>
        <Badge className="bg-emerald-500 text-slate-950 font-bold text-[10px] shrink-0">
          Match {card.score}%
        </Badge>
      </div>

      {/* Badges Info */}
      <div className="flex flex-wrap gap-1 text-[10px]">
        <Badge variant="outline" className="bg-secondary text-foreground text-[10px] py-0">
          <Clock className="size-2.5 mr-1" />
          {card.duration}
        </Badge>
        <Badge variant="outline" className="bg-secondary text-foreground text-[10px] py-0">
          {card.mode}
        </Badge>
        {card.certification && (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] py-0">
            <Award className="size-2.5 mr-1" />
            {card.certification}
          </Badge>
        )}
      </div>

      {/* Matched Reasons */}
      {card.matchedReasons && card.matchedReasons.length > 0 && (
        <div className="bg-secondary/40 rounded-lg p-2 text-[10.5px] space-y-1">
          <p className="font-semibold text-muted-foreground">Mengapa Cocok:</p>
          {card.matchedReasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-1 text-foreground">
              <CheckCircle2 className="size-3 text-emerald-500 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <a
          href={card.url || REGISTRATION_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button size="sm" className="w-full h-7 text-[10.5px] bg-slate-900 hover:bg-slate-800 text-white font-medium cursor-pointer">
            <ExternalLink className="size-3 mr-1 text-emerald-400" />
            Detail & Daftar
          </Button>
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_TRAINING_NUMBER}?text=${encodeURIComponent(
            `Halo Admin PT Mosha, saya berminat dengan rekomendasi pelatihan: ${card.topic}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="sm" variant="outline" className="h-7 text-[10.5px] border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 font-medium cursor-pointer">
            WA Admin
          </Button>
        </a>
      </div>
    </div>
  );
}

// Lightweight Markdown Renderer
function RenderMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        if (line.trim().startsWith("• ") || line.trim().startsWith("- ")) {
          const listText = line.trim().substring(2);
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-emerald-500 font-bold">•</span>
              <span>{parseFormattedText(listText)}</span>
            </div>
          );
        }

        return <div key={idx}>{parseFormattedText(line)}</div>;
      })}
    </div>
  );
}

function parseFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 underline font-semibold hover:opacity-80"
          >
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}

// Client-Side Fallback Consultant Generator (Runs instantly if Convex Action times out or offline)
function generateSmartConsultantResponse(
  input: string,
  userProfile: any,
  setUserProfile: React.Dispatch<React.SetStateAction<any>>
): {
  text: string;
  recommendations?: RecommendationCardData[];
  options?: string[];
  actionLink?: { label: string; url: string };
} {
  const text = input.toLowerCase().trim();

  // 0. Greetings / Salam
  if (/^(halo|hai|hi|hello|selamat\s+(pagi|siang|sore|malam)|assalamualaikum|permisi|hei|hey)[!.,\s]*$/i.test(text)) {
    return {
      text:
        "Halo! Selamat datang di **PT Mosha Sinalsal Solusi (MSS)** 🤖\n\n" +
        "Saya **Mosha AI Assistant**, Virtual Training & Certification Consultant Anda. Saya siap membantu menemukan program pelatihan atau sertifikasi resmi yang paling tepat untuk Anda.\n\n" +
        "Ada yang bisa saya bantu hari ini?",
      options: QUICK_ACTIONS,
    };
  }

  // 1a. Comparison / Difference between active trainings
  if (
    (text.includes("beda") || text.includes("perbedaan") || text.includes("banding") || text.includes("compare")) &&
    (text.includes("plts") || text.includes("oil") || text.includes("gas") || text.includes("training") || text.includes("pelatihan") || text.includes("kursus"))
  ) {
    return {
      text:
        "🔍 **Perbandingan 2 Program Pelatihan Unggulan PT Mosha:**\n\n" +
        "☀️ **1. Pengenalan, Desain & Commissioning PLTS (Terbaru - Online)**\n" +
        "• **Fokus**: Sistem Energi Terbarukan & Tenaga Surya (Modul PV, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi DC, Smart Metering, Desain & Commissioning PLTS).\n" +
        "• **Metode**: **Online via Google Meet / Zoom** (bisa diikuti dari seluruh Indonesia).\n" +
        "• **Jadwal**: Sabtu, 17 Oktober 2026 | 18.00 – 21.30 WIB.\n" +
        "• **Pendaftaran**: [bit.ly/3T6EePy](https://bit.ly/3T6EePy) | WA: 0822268195332 / 082392907198\n\n" +
        "⚙️ **2. Commissioning Fasilitas Oil & Gas & Pembangkit Listrik (Tatap Muka Batam)**\n" +
        "• **Fokus**: Fasilitas industri Migas & Pembangkit Listrik konvensional (10 Modul: P&ID Markup, Mechanical Completion, ITR, Vendor Support, Piping, E&I, Hydrocarbon Startup, Handover).\n" +
        "• **Metode**: **Offline Tatap Muka di Batam** (Ruko Bukit Kemuning Blok DD3 No. 02, Batam).\n" +
        "• **Jadwal**: 26 – 27 September 2026 (Sabtu & Minggu) | 13.30 – 18.00 WIB.\n" +
        "• **Pendaftaran**: [bit.ly/4cz9xct](https://bit.ly/4cz9xct) | WA: 082268195332\n\n" +
        "💡 **Rekomendasi**: Pilih **PLTS** jika ingin belajar energi terbarukan secara fleksibel dari rumah, atau pilih **Oil & Gas** jika ingin mendalami commissioning industri migas tatap muka di Batam!",
      options: ["☀️ Daftar PLTS Online", "⚙️ Daftar Oil & Gas Batam", "💬 Hubungi WA Admin"],
      actionLink: {
        label: "Daftar Training PLTS (Online)",
        url: REGISTRATION_LINK_PLTS,
      },
    };
  }

  // 1b. Schedule / Upcoming / Latest Training
  if (
    text.includes("jadwal") ||
    text.includes("jam") ||
    text.includes("kapan") ||
    text.includes("terbaru") ||
    text.includes("terdekat") ||
    text.includes("agenda")
  ) {
    return {
      text:
        "📅 **Jadwal & Program Pelatihan Unggulan Terdekat di PT Mosha:**\n\n" +
        "☀️ **1. [TERBARU - ONLINE] Pengenalan, Desain & Commissioning PLTS**\n" +
        "• 🗓️ **Jadwal**: Sabtu, 17 Oktober 2026\n" +
        "• ⏰ **Waktu**: 18.00 – 21.30 WIB\n" +
        "• 💻 **Media**: Online via Google Meet / Zoom\n" +
        "• 📚 **Materi**: Modul PV, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi DC, Smart Grid, Desain & Commissioning PLTS\n" +
        "• 📝 **Daftar**: [bit.ly/3T6EePy](https://bit.ly/3T6EePy)\n\n" +
        "⚙️ **2. [OFFLINE BATAM] Commissioning Fasilitas Oil & Gas & Pembangkit Listrik**\n" +
        "• 🗓️ **Jadwal**: 26 – 27 September 2026 (Sabtu & Minggu)\n" +
        "• ⏰ **Waktu**: 13.30 – 18.00 WIB\n" +
        "• 📍 **Lokasi**: Ruko Bukit Kemuning Blok DD3 No. 02, Batam\n" +
        "• 📚 **Materi**: 10 Modul Lengkap Commissioning Migas, P&ID Markup, Mechanical Completion, ITR, Piping, E&I, Hydrocarbon Startup\n" +
        "• 📝 **Daftar**: [bit.ly/4cz9xct](https://bit.ly/4cz9xct)\n\n" +
        "Pelatihan mana yang ingin Anda ikuti?",
      options: ["☀️ Daftar PLTS Online (17 Okt)", "⚙️ Daftar Oil & Gas Batam (26-27 Sept)", "❓ Beda PLTS & Oil Gas?", "💬 WA Admin"],
      actionLink: {
        label: "Daftar Pelatihan PLTS (Online)",
        url: REGISTRATION_LINK_PLTS,
      },
    };
  }

  // 1c. PLTS Specific Training Query
  if (text.includes("plts") || text.includes("surya") || text.includes("solar") || text.includes("photovoltaic")) {
    return {
      text:
        "☀️ **Pelatihan Profesional: Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya)**\n\n" +
        "Diselenggarakan oleh **PT Mosha Sinalsal Solusi & Masebi** secara Online via Google Meet / Zoom.\n\n" +
        "• 🗓️ **Hari & Tanggal**: Sabtu, 17 Oktober 2026\n" +
        "• ⏰ **Waktu**: 18.00 – 21.30 WIB\n" +
        "• 💻 **Platform**: Online via Google Meet / Zoom\n" +
        "• ⚡ **Topik Bahasan Utama**:\n" +
        "  1. Panel Surya Utama (High Efficiency)\n" +
        "  2. Inverter Hibrida Cerdas\n" +
        "  3. Sistem Penyimpanan Baterai Terintegrasi\n" +
        "  4. Distribusi Arus Searah (DC)\n" +
        "  5. Koneksi Jaringan Pintar & Metering\n" +
        "  6. Desain & Prosedur Commissioning PLTS\n" +
        "• 🎁 **Benefit**: Softcopy Modul Training, Sertifikat Dari Perusahaan, Rekaman Video Training, Bergabung Dalam Grup & Komunitas PLTS, Peluang Kerjasama Bisnis.\n\n" +
        "📝 Formulir pendaftaran resmi: [bit.ly/3T6EePy](https://bit.ly/3T6EePy)\n" +
        "📞 WhatsApp Pendaftaran: 0822268195332 / 082392907198",
      options: ["📝 Daftar PLTS (bit.ly/3T6EePy)", "💬 Chat WA Admin PLTS", "❓ Apa Beda PLTS & Oil Gas?"],
      actionLink: {
        label: "Buka Form Daftar PLTS (bit.ly/3T6EePy)",
        url: REGISTRATION_LINK_PLTS,
      },
    };
  }

  // 1d. Oil & Gas Specific Training Query
  if (text.includes("oil") || text.includes("gas") || text.includes("migas") || text.includes("tatap muka batam")) {
    return {
      text:
        "⚙️ **Pelatihan Tatap Muka: Commissioning Fasilitas Oil & Gas & Pembangkit Listrik**\n\n" +
        "Diselenggarakan secara tatap muka langsung (offline) di Batam bersama instruktur berpengalaman industri.\n\n" +
        "• 🗓️ **Hari & Tanggal**: 26 – 27 September 2026 (Sabtu & Minggu)\n" +
        "• ⏰ **Waktu**: 13.30 – 18.00 WIB\n" +
        "• 📍 **Lokasi**: Ruko Bukit Kemuning Blok DD3 No. 02, Batam\n" +
        "• 📚 **10 Modul Lengkap**: Precommissioning, P&ID Markup, Mechanical Completion, ITR, Vendor Support, Piping, E&I, Hydrocarbon Startup & Handover.\n" +
        "• 🎁 **Benefit**: Softcopy Modul, Sertifikat Lembaga Training, Real Project Drawing/ITR, Kisi-Kisi Interview, Rekaman Video.\n\n" +
        "📝 Formulir pendaftaran: [bit.ly/4cz9xct](https://bit.ly/4cz9xct)\n" +
        "📞 WhatsApp Admin: 082268195332",
      options: ["📝 Daftar Oil & Gas (bit.ly/4cz9xct)", "💬 WA Admin Batam", "☀️ Lihat Training PLTS Online"],
      actionLink: {
        label: "Buka Form Daftar Oil & Gas",
        url: REGISTRATION_LINK_OIL_GAS,
      },
    };
  }

  // 2. Cost / Price / Payment / Rekening
  if (
    text.includes("biaya") ||
    text.includes("harga") ||
    text.includes("tarif") ||
    text.includes("bayar") ||
    text.includes("bca") ||
    text.includes("rekening")
  ) {
    return {
      text:
        "💳 **Informasi Biaya & Pembayaran Pelatihan PT Mosha Sinalsal Solusi:**\n\n" +
        "• **Training PLTS (Online - 17 Okt 2026)**: Rp 250.000\n" +
        "• **Training Oil & Gas (Offline Batam)**: Rp 1.500.000\n" +
        "• **Training Oil & Gas (Online)**: Rp 500.000\n\n" +
        "📝 **Rekening Resmi Pembayaran:**\n" +
        "• **Bank Central Asia (BCA)**: 3262681995\n" +
        "• **Atas Nama**: PT Mosha Sinalsal Solusi\n" +
        "• **Email Verifikasi**: moshasolusi@gmail.com\n\n" +
        "Anda dapat langsung mendaftar dan mengunggah bukti transfer melalui formulir online kami:",
      options: ["📝 Buka Formulir Pendaftaran", "💬 Hubungi WA Training", "📅 Jadwal Terdekat"],
      actionLink: {
        label: "Buka Formulir Pendaftaran & Bayar",
        url: "/pendaftaran",
      },
    };
  }

  // 3. Location / Office / Contacts
  if (
    text.includes("lokasi") ||
    text.includes("alamat") ||
    text.includes("kantor") ||
    text.includes("kontak") ||
    /\bwa\b/.test(text) ||
    text.includes("whatsapp")
  ) {
    return {
      text:
        "📍 **Kontak & Lokasi Kantor PT Mosha Sinalsal Solusi:**\n\n" +
        "• **Alamat**: Ruko Bukit Kemuning Blok DD3 No. 02, Batam, Kepulauan Riau\n" +
        "• **WhatsApp Training**: +62 822-6819-5332\n" +
        "• **WhatsApp CS / Kantor**: +62 812-7022-7709\n" +
        "• **Email**: contact@moshassolusi.com\n" +
        "• **Jam Kerja**: Senin – Jumat: 08.30 – 17.00 WIB | Sabtu: 09.00 – 15.00 WIB",
      options: ["💬 Chat WA Training", "📝 Form Pendaftaran", "📚 Katalog Pelatihan"],
      actionLink: {
        label: "Buka WhatsApp Training",
        url: WHATSAPP_TRAINING_URL,
      },
    };
  }

  // 4. Catalog / All Trainings / Daftar Topik
  if (
    text.includes("semua pelatihan") ||
    text.includes("daftar pelatihan") ||
    text.includes("daftar training") ||
    text.includes("katalog") ||
    text.includes("lihat semua") ||
    text.includes("list training")
  ) {
    return {
      text:
        "📚 **PT Mosha Sinalsal Solusi Menyediakan 40+ Program Training & Sertifikasi:**\n\n" +
        "1. **Commissioning & Engineering**: Oil & Gas, Power Plant, Mechanical Piping, E&I, Tube Fitting\n" +
        "2. **Renewable Energy (PLTS)**: Teori, Praktik, Design (PVsyst/Helioscope), Hybrid HOMER Pro, Sertifikasi KEBTKE ESDM\n" +
        "3. **Sustainability & ESG**: Audit Energi, GHG Emission Accounting, ESG & ESGRC (BNSP)\n" +
        "4. **Manajemen Proyek & Software**: PMP (BNSP), MS Project, AutoCAD / Drafter, Minitab\n" +
        "5. **K3 & Sertifikasi Kompetensi**: K3 Umum, K3 Listrik, K3 BNSP, PLTSa, IPTL, PLTD\n" +
        "6. **Microsoft Apps & AI**: Excel, Power BI, Copilot & AI Productivity",
      options: ["🎓 Cari Pelatihan yang Cocok", "📜 Sertifikasi Resmi BNSP", "💬 Tanya WA Admin"],
      actionLink: {
        label: "Konsultasi via WA",
        url: WHATSAPP_TRAINING_URL,
      },
    };
  }

  // 5. How to Register / Form Pendaftaran
  if (text.includes("daftar") || text.includes("registrasi")) {
    return {
      text:
        "📝 **Cara Pendaftaran Pelatihan di PT Mosha Sinalsal Solusi:**\n\n" +
        "1. Isi formulir pendaftaran resmi online melalui tautan di bawah\n" +
        "2. Konfirmasi bukti pembayaran/administrasi ke Admin Training via WhatsApp\n" +
        "3. Dapatkan modul, akses kelas, dan jadwal briefing peserta\n\n" +
        "Link pendaftaran resmi: [https://bit.ly/4cz9xct](https://bit.ly/4cz9xct)",
      options: ["💬 Chat Admin WA", "📅 Jadwal Terdekat", "💳 Info Rekening BCA"],
      actionLink: {
        label: "Buka Form Pendaftaran Bitly",
        url: REGISTRATION_LINK,
      },
    };
  }

  // 6. Accounting / Finance background
  if (
    text.includes("akuntan") ||
    text.includes("akuntansi") ||
    text.includes("keuangan") ||
    text.includes("finance")
  ) {
    setUserProfile((prev: any) => ({ ...prev, role: "Akuntansi & Keuangan" }));
    return {
      text:
        "Sangat menarik! Latar belakang **Akuntansi & Keuangan** yang dipadukan dengan pemahaman **Commissioning / Manajemen Proyek Industri** merupakan keunggulan kompetitif langka yang sangat dicari untuk posisi *Project Cost Controller, Contract Admin, atau Project Auditor*.\n\n" +
        "Berikut program pelatihan yang sangat kami rekomendasikan untuk Anda:",
      recommendations: [
        {
          trainingId: "commissioning-oil-gas-dan-sistem-pembangkit-listrik",
          topic: "Commissioning Oil & Gas dan Sistem Pembangkit Listrik (Online)",
          category: "Commissioning & Engineering",
          level: "Pemula / Beginner",
          duration: "2 x 2,5 jam",
          mode: "Online",
          certification: "Sertifikat Lembaga Training (PT Mosha & Masebi)",
          url: REGISTRATION_LINK,
          score: 95,
          matchedReasons: [
            "Pengantar alur tahapan commissioning untuk pemula",
            "Mendukung pemahaman alur biaya, kontrak, & administrasi proyek industri",
          ],
        },
        {
          trainingId: "microsoft-apps-ai-training",
          topic: "Microsoft Apps & AI Training",
          category: "Software & IT",
          level: "Pemula / Beginner",
          duration: "2 x 2,5 jam",
          mode: "Online & Offline",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 90,
          matchedReasons: ["Pengolahan data Excel & AI tools untuk efisiensi pelaporan", "Sangat relevan untuk bidang keuangan & proyek"],
        },
      ],
      options: ["📅 Tanya Jadwal Terdekat", "📝 Form Pendaftaran", "💬 Diskusi via WA Admin"],
    };
  }

  // 7. IT / Computer / Software background
  if (/\b(it|ti|informatika|komputer|software)\b/i.test(text)) {
    setUserProfile((prev: any) => ({ ...prev, role: "IT & Komputer" }));
    return {
      text:
        "Bagus sekali! Sebagai profesional / mahasiswa di bidang **Teknologi Informasi (IT)**, Anda memiliki keunggulan analitis yang kuat untuk implementasi automasi dan sistem instrumentasi modern.\n\n" +
        "Berikut pelatihan yang sangat relevan untuk profil Anda:",
      recommendations: [
        {
          trainingId: "microsoft-apps-ai-training",
          topic: "Microsoft Apps & AI Training (Excel, Power BI, Copilot)",
          category: "Software & IT",
          level: "Pemula / Beginner",
          duration: "2 x 2,5 jam",
          mode: "Online & Offline",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 95,
          matchedReasons: ["Eksplorasi automasi AI & Power BI dashboard", "Meningkatkan kemampuan data analytics"],
        },
        {
          trainingId: "commissioning-electrical-instrument",
          topic: "Commissioning Electrical & Instrument",
          category: "Commissioning & Engineering",
          level: "Pemula - Menengah",
          duration: "2 x 2,5 jam",
          mode: "Online",
          certification: "Sertifikat PT Mosha & Masebi",
          url: REGISTRATION_LINK,
          score: 88,
          matchedReasons: ["Relevan dengan sistem SCADA, sensor kontrol, & loop testing industri"],
        },
      ],
      options: ["📅 Jadwal Terdekat", "💬 WA Admin Training", "📝 Form Pendaftaran"],
    };
  }

  // 8. Mahasiswa
  if (text.includes("mahasiswa") || text.includes("kuliah") || text.includes("kampus")) {
    setUserProfile((prev: any) => ({ ...prev, role: "Mahasiswa" }));
    return {
      text:
        "Tentu! Sebagai **Mahasiswa**, berikut adalah program pelatihan & sertifikasi yang paling banyak diambil untuk mempersiapkan portofolio karier sebelum lulus:",
      recommendations: [
        {
          trainingId: "microsoft-apps-ai-training",
          topic: "Microsoft Apps & AI Training",
          category: "Software & IT",
          level: "Pemula / Beginner",
          duration: "2 x 2,5 jam",
          mode: "Online & Offline",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 94,
          matchedReasons: ["Pengembangan skill AI & produktivitas kerja", "Bisa diikuti semua jurusan"],
        },
        {
          trainingId: "plts-pembangkit-listrik-tenaga-surya-teori",
          topic: "PLTS - Pembangkit Listrik Tenaga Surya (Teori & Design)",
          category: "Renewable Energy (PLTS)",
          level: "Pemula / Beginner",
          duration: "2 x 2,5 jam",
          mode: "Online",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 88,
          matchedReasons: ["Trend industri Energi Terbarukan masa depan", "Mendukung persiapan kerja"],
        },
      ],
      options: ["📜 Sertifikasi BNSP / KEBTKE", "📅 Jadwal Pelatihan Terdekat", "💬 Diskusi via WA Admin"],
    };
  }

  // 9. Teknisi / Fitter
  if (text.includes("teknisi") || text.includes("fitter") || text.includes("mekanik")) {
    setUserProfile((prev: any) => ({ ...prev, role: "Teknisi / Fitter Industri" }));
    return {
      text:
        "Sangat baik! Untuk **Teknisi Industri / Kelistrikan / Fitter**, kami merekomendasikan program pelatihan praktis berikut:",
      recommendations: [
        {
          trainingId: "commissioning-electrical-instrument",
          topic: "Commissioning Electrical & Instrument",
          category: "Commissioning & Engineering",
          level: "Pemula - Menengah",
          duration: "2 x 2,5 jam",
          mode: "Online",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 92,
          matchedReasons: ["Pengujian loop test & kalibrasi instrumen", "Cocok untuk Teknisi E&I"],
        },
        {
          trainingId: "tube-fitting-tube-bending",
          topic: "Tube Fitting & Tube Bending",
          category: "Commissioning & Engineering",
          level: "Pemula / Beginner",
          duration: "2 x 5 jam",
          mode: "Online & Offline",
          certification: "Sertifikat PT Mosha",
          url: REGISTRATION_LINK,
          score: 89,
          matchedReasons: ["Praktik teknik pembentukan & penyambungan tube instrumen"],
        },
      ],
      options: ["⚡ Commissioning Oil & Gas", "📜 Sertifikasi K3 / BNSP", "💬 Tanya WA Admin"],
    };
  }

  // 10. Sertifikasi Resmi BNSP / KEBTKE
  if (text.includes("sertifikasi") || text.includes("bnsp") || text.includes("kebtke")) {
    return {
      text:
        "🎓 **Program Sertifikasi Resmi di PT Mosha Sinalsal Solusi:**\n\n" +
        "• **Sertifikasi KEBTKE ESDM**: PLTS Pembangkit Listrik Tenaga Surya\n" +
        "• **Sertifikasi BNSP**: ESG (Environment, Social, Governance), ESGRC, Project Management (PMP), Ahli K3\n" +
        "• **Sertifikasi SKKNI / Ketenagalistrikan**: Auditor Energi, Manajer Energi, PLTSa, IPTL, PLTD.",
      recommendations: [
        {
          trainingId: "plts-sertifikasi-kebtke",
          topic: "PLTS - Training & Sertifikasi KEBTKE ESDM",
          category: "Certifications & Competency",
          level: "Menengah - Lanjutan",
          duration: "3 x 5 jam",
          mode: "Online & Offline",
          certification: "Sertifikasi Resmi KEBTKE ESDM",
          url: REGISTRATION_LINK,
          score: 95,
          matchedReasons: ["Sertifikasi Kompetensi Resmi ESDM", "Pengakuan Resmi Industri"],
        },
        {
          trainingId: "esg-environment-social-governance-bnsp",
          topic: "Environment, Social, Governance (ESG) - Sertifikasi BNSP",
          category: "Certifications & Competency",
          level: "Menengah - Lanjutan",
          duration: "3 Hari",
          mode: "Online & Offline",
          certification: "Sertifikasi BNSP Resmi",
          url: REGISTRATION_LINK,
          score: 92,
          matchedReasons: ["Sertifikat Kompetensi Garuda BNSP", "Strategi Keberlanjutan Korporat"],
        },
      ],
      options: ["💬 WA Admin Sertifikasi", "📝 Form Pendaftaran Online", "📅 Jadwal Pelatihan Terdekat"],
    };
  }

  // 11. Asking about Career / General Recommendation
  if (text.includes("karier") || /\bkerja\b/.test(text) || text.includes("pekerjaan") || text.includes("cocok")) {
    return {
      text:
        "Tentu! Saya siap membantu mencari pelatihan yang paling sesuai dengan target karier Anda di **PT Mosha Sinalsal Solusi**.\n\n" +
        "Agar saya dapat memberikan rekomendasi yang akurat, boleh tahu:\n" +
        "1. Saat ini Anda berstatus sebagai **Mahasiswa, Teknisi, Engineer**, atau bidang pekerjaan lainnya?\n" +
        "2. Bidang apa yang ingin Anda pelajari (misal: *Commissioning Oil & Gas, PLTS Energi Terbarukan, K3 Safety, atau Software & AI*)?",
      options: ["🎓 Saya Mahasiswa", "👷 Saya Teknisi", "⚡ Saya Engineer", "📜 Butuh Sertifikasi Resmi"],
    };
  }

  // 12. General Conversational Fallback
  return {
    text:
      `Terima kasih! Saya siap membantu menjawab pertanyaan Anda terkait **"${input}"** di PT Mosha Sinalsal Solusi.\n\n` +
      `Boleh ceritakan sedikit mengenai latar belakang pendidikan atau profesi Anda saat ini, agar saya bisa memberikan panduan yang paling tepat?`,
    options: ["🎓 Saya Mahasiswa", "👷 Saya Teknisi", "⚡ Saya Engineer", "📅 Tanya Jadwal Terdekat"],
  };
}
