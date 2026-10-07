import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { SEED_TRAININGS_DATA } from "./trainings";
import { scoreTraining } from "./recommendations";
import { COMPANY_PROFILE_DATA } from "./company";

const OPENROUTER_MODELS = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
];
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are Mosha AI Assistant, an intelligent training and certification consultant for PT Mosha Sinalsal Solusi (MSS).
Tagline: Local Company | Global Capabilities.

YOUR MANDATE:
1. Act as an empathetic, highly knowledgeable training consultant. Your job is to understand the visitor's background, education, occupation, skills, interests, career goals, and experience level, then guide them to the right training programs offered by PT Mosha Sinalsal Solusi.
2. Engage in natural, progressive conversation. DO NOT conduct a rigid questionnaire or ask numbered form questions. Ask only 1 or 2 relevant follow-up questions at a time.
3. DIRECT ANSWER & TRAINING DIFFERENTIATION RULE:
   When user asks about upcoming / latest trainings ("jadwal terbaru", "pelatihan terdekat", "apa saja trainingnya", "apa bedanya"):
   You MUST clearly explain and distinguish between our two featured training programs:
   A. [TERBARU - ONLINE] "Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya)"
      • Penyelenggara: PT Mosha Sinalsal Solusi & Masyarakat Sistem Energi Berkelanjutan Indonesia (Masebi - www.masebi.org)
      • Mode: Online via Google Meet
      • Jadwal: Sabtu, 17 Oktober 2026 | 18.00 – 21.30 WIB
      • Biaya Training: Rp 250.000 (Dua Ratus Lima Puluh Ribu Rupiah)
      • Batas Pembayaran: Paling lambat 16 Oktober 2026
      • Rekening Pembayaran Resmi: Bank Central Asia (BCA) No. 3262681995 a.n. PT Mosha Sinalsal Solusi
      • Email Konfirmasi: moshasolusi@gmail.com
      • Topik: Panel Surya Utama, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi DC, Smart Metering, Desain & Commissioning PLTS.
      • Sasaran: Siapapun dari seluruh Indonesia (Engineer, Teknisi, Mahasiswa, Praktisi Solar).
      • Link Formulir Pendaftaran & Bayar: Menu "Pendaftaran & Bayar" (/pendaftaran) | WA Admin: 0822268195332 / 082392907198
   B. [OFFLINE TATAP MUKA BATAM] "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik"
      • Mode: Offline Tatap Muka (Ruko Bukit Kemuning Blok DD3 No. 02, Batam)
      • Jadwal: 26 – 27 September 2026 (Sabtu & Minggu) | 13.30 – 18.00 WIB
      • Biaya: Rp 1.500.000 (Satu Juta Lima Ratus Ribu Rupiah)
      • Rekening: BCA No. 3262681995 a.n. PT Mosha Sinalsal Solusi
      • Topik: 10 Modul Commissioning Migas (P&ID Markup, Mechanical Completion, ITR, Piping, E&I, Hydrocarbon Startup, System Handover).
      • Sasaran: Praktisi industri, teknisi & engineer yang ingin praktik langsung di Batam.
      • Link Daftar: Menu /pendaftaran | WA Admin: 082268195332
4. If a user asks what is the difference between them, explain:
   - Topik/Industri: PLTS fokus pada energi terbarukan tenaga surya ramah lingkungan, sedangkan Oil & Gas fokus pada fasilitas minyak & gas bumi serta pembangkit konvensional.
   - Biaya: PLTS Rp 250.000, sedangkan Oil & Gas Offline Batam Rp 1.500.000.
   - Metode: PLTS adalah kelas ONLINE (Google Meet), sedangkan Oil & Gas adalah kelas OFFLINE Tatap Muka di Batam.
   - Pendaftaran: Keduanya bisa didaftarkan langsung melalui menu "Pendaftaran & Bayar" (/pendaftaran) atau via WhatsApp panitia.
5. CROSS-DISCIPLINARY GUIDANCE: If a user with non-technical background (e.g. Akuntansi / Accounting, Ekonomi, Manajemen) expresses interest in technical fields like Commissioning, Oil & Gas, or Renewable Energy, warmly validate their interest! Explain how foundational training can give them a unique competitive edge in project administration, cost control, and engineering management.
6. CONVERSATION FLOW RULE: If the user asks "apa yang cocok untuk saya?" without providing any background yet, ask them about their current role or field of interest first.
7. STRICT ANTI-HALLUCINATION RULE: Never invent training names, prices, schedules, locations, certification bodies, contact numbers, or company details that are NOT present in the provided data.
8. If requested information is not in the database, explicitly state: "Informasi tersebut belum tersedia pada data yang dapat saya akses." then offer next steps (WhatsApp Admin: 0822268195332 or 082392907198).
9. Always maintain a professional, helpful, polite tone in natural Indonesian (Bahasa Indonesia) unless the user speaks another language.
10. ZERO INTERNAL MONOLOGUE RULE: Never include your chain-of-thought, reasoning steps, analysis of the user's intent, or English internal monologue. Respond directly with the final polite answer in Indonesian starting from the very first word.
`;

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const chatWithMoshaAI = action({
  args: {
    sessionId: v.string(),
    userMessage: v.string(),
  },
  handler: async (ctx, args) => {
    const rawKey = process.env.OPENROUTER_API_KEY || "";
    const apiKey = rawKey.trim();

    // Save user message to database
    await ctx.runMutation(api.sessions.saveChatMessage, {
      sessionId: args.sessionId,
      role: "user",
      content: args.userMessage,
    });

    // Fetch existing messages history and user profile from Convex
    const history = await ctx.runQuery(api.sessions.getSessionHistory, {
      sessionId: args.sessionId,
    });

    const userProfile = await ctx.runQuery(api.sessions.getUserProfileBySession, {
      sessionId: args.sessionId,
    });

    // Fetch training list and company info from database
    const trainingsInDb = await ctx.runQuery(api.trainings.getTrainingList, {});
    const trainings = trainingsInDb && trainingsInDb.length > 0 ? trainingsInDb : SEED_TRAININGS_DATA;

    // Extract basic profile intent from user message
    const updatedProfileData = extractProfileFromMessage(args.userMessage, userProfile);
    if (updatedProfileData) {
      await ctx.runMutation(api.sessions.updateUserProfile, {
        sessionId: args.sessionId,
        ...updatedProfileData,
      });
    }

    const currentProfile = {
      ...(userProfile || {}),
      ...(updatedProfileData || {}),
    };

    // Check if user has provided ANY profile info (occupation, education, interest, skills, or goals)
    const hasProfileInfo =
      Boolean(currentProfile.occupation) ||
      Boolean(currentProfile.education) ||
      Boolean(currentProfile.industry) ||
      Boolean(currentProfile.interests?.length) ||
      Boolean(currentProfile.skills?.length) ||
      Boolean(currentProfile.goals?.length);

    let calculatedRecommendations: any[] = [];

    // ONLY calculate recommendation cards IF user profile actually contains profile info
    if (hasProfileInfo) {
      const scored = trainings.map((t: any) => {
        const { score, matchedReasons } = scoreTraining(t, currentProfile);
        return {
          trainingId: t.slug,
          topic: t.name,
          category: t.category,
          level: t.level,
          duration: t.duration,
          mode: t.mode,
          certification: t.certification,
          url: t.url || "https://bit.ly/4cz9xct",
          score,
          matchedReasons,
        };
      });

      scored.sort((a: any, b: any) => b.score - a.score);
      calculatedRecommendations = scored.slice(0, 3);
    }

    // Build context data for system prompt
    const dataContext = `
[ACTUAL COMPANY & UPCOMING TRAINING DATA]
Company Name: ${COMPANY_PROFILE_DATA.name} (${COMPANY_PROFILE_DATA.tagline})
Location: ${COMPANY_PROFILE_DATA.location}
Contacts: CS WA: ${COMPANY_PROFILE_DATA.contacts.phoneCS}, Training WA 1: ${COMPANY_PROFILE_DATA.contacts.phoneTraining}, Training WA 2: ${COMPANY_PROFILE_DATA.contacts.phoneTraining2}, Email: ${COMPANY_PROFILE_DATA.contacts.emailGeneral}, Admin Email: ${COMPANY_PROFILE_DATA.contacts.emailAdmin}
Bank BCA: ${COMPANY_PROFILE_DATA.bankAccount.accountNumber} a/n ${COMPANY_PROFILE_DATA.bankAccount.accountHolder}

PELATIHAN TERBARU 1 (ONLINE VIA ZOOM / MEET):
• Topik: Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya)
• Format: Online via Google Meet / Zoom
• Jadwal: Sabtu, 17 Oktober 2026 | 18.00 – 21.30 WIB
• Penyelenggara: PT Mosha Sinalsal Solusi & Masebi (Masyarakat Sistem Energi Berkelanjutan Indonesia)
• Fokus Materi: Panel Surya Modul PV, Inverter Hibrida Cerdas, Sistem Penyimpanan Baterai Terintegrasi, Distribusi Arus DC, Smart Grid & Metering, Desain & Prosedur Commissioning PLTS
• Benefit: Softcopy Modul Training, Sertifikat Dari Perusahaan, Rekaman Video Training, Grup PLTS & Komunitas, Peluang Kerjasama Bisnis
• Tautan Pendaftaran: https://bit.ly/3T6EePy
• Narahubung WA: 0822268195332 / 082392907198

PELATIHAN TERBARU 2 (OFFLINE TATAP MUKA BATAM):
• Topik: Commissioning Fasilitas Oil & Gas & Pembangkit Listrik
• Format: Offline Tatap Muka (Ruko Bukit Kemuning Blok DD3 No. 02, Batam)
• Jadwal: 26 – 27 September 2026 (Sabtu & Minggu) | 13.30 – 18.00 WIB
• Penyelenggara: PT Mosha Sinalsal Solusi & Masebi
• Fokus Materi: 10 Modul Commissioning Industri Migas & Power Plant, P&ID Markup, Mechanical Completion, ITR, Vendor Support, Piping, E&I, Hydrocarbon Startup, System Handover
• Benefit: Softcopy Modul, Sertifikat Lembaga Training, Contoh Project Prosedur/ITR/Drawing, Kisi-Kisi Interview, Rekaman Video
• Tautan Pendaftaran: https://bit.ly/4cz9xct
• Narahubung WA: 082268195332

[AVAILABLE TRAINING CATALOG (${trainings.length} TOPICS)]
${trainings
  .map(
    (t: any) =>
      `• [No.${t.no}] ${t.name} | Kat: ${t.category} | Durasi: ${t.duration} | Mode: ${t.mode} | Sertifikasi: ${t.certification}`
  )
  .join("\n")}

[CURRENT USER KNOWN PROFILE]
${JSON.stringify(currentProfile, null, 2)}
[HAS USER PROVIDED BACKGROUND DETAILS]: ${hasProfileInfo ? "YES" : "NO - MUST ASK BACKGROUND FIRST"}
`;

    // Construct OpenRouter API messages
    const openRouterMessages: OpenRouterMessage[] = [
      { role: "system", content: `${SYSTEM_PROMPT}\n\n${dataContext}` },
    ];

    // Include last 8 history messages for conversation continuity
    const historySlice = history.slice(-8);
    for (const msg of historySlice) {
      if (msg.role === "user" || msg.role === "assistant") {
        let content = msg.content;
        if (msg.role === "assistant") {
          content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
          if (/^(?:okay|the user|first,|let me unpack|looking at the)/i.test(content)) {
            const marker = content.search(/(?:\n\n|\r\n\r\n)(?:Halo|Hai|Selamat|Tentu|Menarik|Wah|Keren|Untuk|Mengenai|Program|Pelatihan|Terkait|Commissioning)/i);
            if (marker !== -1) content = content.substring(marker).trim();
          }
        }
        openRouterMessages.push({
          role: msg.role as "user" | "assistant",
          content,
        });
      }
    }

    // Context-aware fast fallback response generator
    const fallbackResponse = () => {
      const q = args.userMessage.toLowerCase();

      // 0. Greeting / Salam — respond warmly without forcing recommendations
      if (
        /^(halo|hai|hi|hello|selamat\s+(pagi|siang|sore|malam)|assalamualaikum|permisi|hei|hey)[!.,\s]*$/i.test(q)
      ) {
        return (
          `Halo! Selamat datang di **PT Mosha Sinalsal Solusi** 🤖\n\n` +
          `Saya **Mosha AI Assistant**, siap membantu mencarikan pelatihan & sertifikasi yang paling cocok untuk Anda.\n\n` +
          `Saat ini kami membuka 2 pelatihan unggulan terdekat:\n` +
          `1. ☀️ **Pengenalan, Desain & Commissioning PLTS** (Online, 17 Okt 2026)\n` +
          `2. ⚙️ **Commissioning Fasilitas Oil & Gas & Pembangkit Listrik** (Offline Batam, 26-27 Sept 2026)\n\n` +
          `Silakan tanyakan detail jadwal atau ceritakan latar belakang Anda untuk rekomendasi!`
        );
      }

      // Comparison / Difference between active trainings
      if (
        (q.includes("beda") || q.includes("perbedaan") || q.includes("banding") || q.includes("compare")) &&
        (q.includes("plts") || q.includes("oil") || q.includes("gas") || q.includes("training") || q.includes("pelatihan"))
      ) {
        return (
          `Berikut perbandingan 2 pelatihan unggulan terdekat di **PT Mosha Sinalsal Solusi**:\n\n` +
          `☀️ **1. Pengenalan, Desain & Commissioning PLTS (Terbaru)**\n` +
          `• **Topik**: Sistem Tenaga Surya ramah lingkungan (Modul PV, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi DC, Smart Grid, Commissioning PLTS).\n` +
          `• **Mode**: **Online via Google Meet / Zoom** (bisa diikuti dari seluruh Indonesia).\n` +
          `• **Jadwal**: Sabtu, 17 Oktober 2026 (18.00 – 21.30 WIB).\n` +
          `• **Pendaftaran**: [bit.ly/3T6EePy](https://bit.ly/3T6EePy) | WA: 0822268195332 / 082392907198\n\n` +
          `⚙️ **2. Commissioning Fasilitas Oil & Gas & Pembangkit Listrik**\n` +
          `• **Topik**: Sistem industri Migas & Power Plant konvensional (10 Modul: P&ID Markup, Mechanical Completion, ITR, Piping, E&I, Hydrocarbon Startup, Handover).\n` +
          `• **Mode**: **Offline Tatap Muka di Batam** (Ruko Bukit Kemuning Blok DD3 No. 02, Batam).\n` +
          `• **Jadwal**: 26 – 27 September 2026 (Sabtu & Minggu, 13.30 – 18.00 WIB).\n` +
          `• **Pendaftaran**: [bit.ly/4cz9xct](https://bit.ly/4cz9xct) | WA: 082268195332\n\n` +
          `**Kesimpulan**: Jika Anda tertarik pada Energi Terbarukan & ingin belajar secara Online, pilihlah **PLTS**. Jika Anda ingin fokus pada industri Migas & ingin belajar tatap muka langsung di Batam, pilihlah **Commissioning Oil & Gas**!`
        );
      }

      // 1. Asking for latest schedule / upcoming training
      if (
        q.includes("terbaru") ||
        q.includes("jadwal") ||
        q.includes("kapan") ||
        q.includes("agenda") ||
        q.includes("terdekat")
      ) {
        return (
          `PT Mosha Sinalsal Solusi saat ini membuka pendaftaran untuk **2 Pelatihan Unggulan Terdekat**:\n\n` +
          `☀️ **1. [TERBARU - ONLINE] Pengenalan, Desain & Commissioning PLTS**\n` +
          `• **Jadwal:** Sabtu, 17 Oktober 2026 | 18.00 – 21.30 WIB\n` +
          `• **Mode:** Online via Google Meet / Zoom\n` +
          `• **Materi:** Panel Surya PV, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi DC, Smart Metering, Desain & Commissioning PLTS\n` +
          `• **Benefit:** Modul Softcopy, Sertifikat Perusahaan, Rekaman Video, Grup PLTS & Komunitas, Kerjasama Bisnis\n` +
          `• **Pendaftaran:** [bit.ly/3T6EePy](https://bit.ly/3T6EePy) | WA: 0822268195332 / 082392907198\n\n` +
          `⚙️ **2. [OFFLINE BATAM] Commissioning Fasilitas Oil & Gas & Pembangkit Listrik**\n` +
          `• **Jadwal:** 26 – 27 September 2026 (Sabtu & Minggu) | 13.30 – 18.00 WIB\n` +
          `• **Mode:** Offline Tatap Muka (Ruko Bukit Kemuning Blok DD3 No. 02, Batam)\n` +
          `• **Materi:** 10 Modul Lengkap Commissioning Migas, P&ID Markup, Mechanical Completion, ITR, Piping, E&I, Hydrocarbon Startup\n` +
          `• **Pendaftaran:** [bit.ly/4cz9xct](https://bit.ly/4cz9xct) | WA: 082268195332\n\n` +
          `Apakah Anda ingin mendaftar untuk kelas Online PLTS (17 Okt) atau kelas Tatap Muka Batam (26-27 Sept)?`
        );
      }

      // PLTS specific query
      if (q.includes("plts") || q.includes("surya") || q.includes("solar") || q.includes("photovoltaic")) {
        return (
          `Untuk bidang **PLTS (Pembangkit Listrik Tenaga Surya)**, kami memiliki pelatihan terbaru:\n\n` +
          `☀️ **Pengenalan, Desain & Commissioning PLTS** (Bersama PT Mosha & Masebi)\n` +
          `• **Jadwal:** Sabtu, 17 Oktober 2026 | 18.00 – 21.30 WIB\n` +
          `• **Format:** Online via Google Meet / Zoom\n` +
          `• **Pokok Bahasan:** Panel Surya Efisiensi Tinggi, Inverter Hibrida Cerdas, Baterai Terintegrasi, Distribusi Arus DC, Smart Grid, Desain & Prosedur Commissioning PLTS\n` +
          `• **Benefit:** Softcopy Modul, Sertifikat Perusahaan, Rekaman Video, Komunitas PLTS, Peluang Kerjasama Bisnis\n` +
          `• **Form Pendaftaran Online:** [bit.ly/3T6EePy](https://bit.ly/3T6EePy)\n` +
          `• **Kontak WhatsApp:** 0822268195332 / 082392907198\n\n` +
          `Selain itu kami juga menyediakan Sertifikasi KEBTKE ESDM bidang PLTS dan pelatihan software PVsyst / HOMER Pro.`
        );
      }

      // 1b. Asking for catalog / list of all trainings
      if (
        q.includes("semua pelatihan") ||
        q.includes("daftar pelatihan") ||
        q.includes("daftar training") ||
        q.includes("katalog") ||
        q.includes("list training") ||
        q.includes("lihat semua")
      ) {
        return (
          `PT Mosha Sinalsal Solusi menyediakan **${trainings.length}+ program training & sertifikasi** dalam berbagai kategori:\n\n` +
          `1. **Commissioning & Engineering**: Oil & Gas, Power Plant, Mechanical Piping, E&I, Tube Fitting\n` +
          `2. **Renewable Energy (PLTS)**: Teori, Praktik, Design (PVsyst/Helioscope), Sertifikasi KEBTKE\n` +
          `3. **Sustainability & ESG**: Audit Energi, GHG Emission, ESG & ESGRC (BNSP)\n` +
          `4. **Manajemen Proyek & Software**: PMP (BNSP), MS Project, AutoCAD, Minitab\n` +
          `5. **K3 & Sertifikasi Kompetensi**: K3 Umum, K3 Listrik, K3 BNSP\n` +
          `6. **Microsoft Apps & AI**: Excel, Power BI, Copilot, AI Productivity\n\n` +
          `Mau saya bantu carikan yang paling cocok untuk profil Anda?`
        );
      }

      // 2. Asking about cost / pricing / registration
      if (
        q.includes("biaya") ||
        q.includes("harga") ||
        q.includes("bayar") ||
        (q.includes("daftar") && !q.includes("daftar pelatihan") && !q.includes("daftar training")) ||
        q.includes("registrasi") ||
        q.includes("bca") ||
        q.includes("rekening")
      ) {
        return (
          `Untuk pendaftaran pelatihan di **PT Mosha Sinalsal Solusi**, Anda dapat mengisi formulir online resmi kami:\n\n` +
          `📝 **Link Pendaftaran:** [Formulir Online](https://bit.ly/4cz9xct)\n` +
          `💳 **Pembayaran Rekening Resmi:**\n` +
          `• Bank Central Asia (BCA): **${COMPANY_PROFILE_DATA.bankAccount.accountNumber}**\n` +
          `• Atas Nama: **${COMPANY_PROFILE_DATA.bankAccount.accountHolder}**\n\n` +
          `Untuk informasi promo khusus mahasiswa, diskon grup, atau rincian investasi per modul, silakan hubungi tim kami via WhatsApp Training: **${COMPANY_PROFILE_DATA.contacts.phoneTraining}**.`
        );
      }

      // 3. Asking about contact / office location
      if (
        q.includes("kontak") ||
        q.includes("lokasi") ||
        q.includes("alamat") ||
        q.includes("kantor") ||
        /\bwa\b/.test(q) ||
        q.includes("whatsapp")
      ) {
        return (
          `Berikut kontak resmi dan lokasi kantor **PT Mosha Sinalsal Solusi**:\n\n` +
          `📍 **Alamat:** ${COMPANY_PROFILE_DATA.location}\n` +
          `📱 **WhatsApp Training:** ${COMPANY_PROFILE_DATA.contacts.phoneTraining}\n` +
          `📱 **WhatsApp CS:** ${COMPANY_PROFILE_DATA.contacts.phoneCS}\n` +
          `✉️ **Email:** ${COMPANY_PROFILE_DATA.contacts.emailGeneral}\n` +
          `⏰ **Jam Operasional:** ${COMPANY_PROFILE_DATA.operatingHours.workdays}`
        );
      }

      // 4. Personalized recommendation if profile exists
      if (hasProfileInfo && calculatedRecommendations.length > 0) {
        return (
          `Berdasarkan informasi profil Anda (${currentProfile.occupation || currentProfile.education || currentProfile.interests?.join(", ") || "teknis"}), berikut rekomendasi pelatihan di **PT Mosha Sinalsal Solusi** yang paling sesuai:\n\n` +
          calculatedRecommendations
            .map(
              (rec: any, idx: number) =>
                `**${idx + 1}. ${rec.topic}** (Relevansi: ${rec.score}%)\n` +
                `• Mode: ${rec.mode} | Durasi: ${rec.duration}\n` +
                `• Mengapa cocok: ${rec.matchedReasons.join("; ")}\n`
            )
            .join("\n") +
          `\nApakah Anda ingin berkonsultasi lebih lanjut mengenai jadwal atau silabus modul materi di atas?`
        );
      }

      // 5. Default welcoming question
      return (
        `Tentu! Saya siap membantu mencari pelatihan yang paling sesuai dengan kebutuhan Anda di **PT Mosha Sinalsal Solusi**.\n\n` +
        `Agar rekomendasi yang saya berikan akurat, boleh tahu:\n` +
        `1. Saat ini Anda berstatus sebagai **Mahasiswa, Teknisi, Engineer**, atau bidang pekerjaan lainnya?\n` +
        `2. Bidang apa yang ingin Anda pelajari (misal: *Commissioning Oil & Gas, PLTS Energi Terbarukan, K3 Safety, atau Software & AI*)?`
      );
    };

    let aiTextResult = "";
    let hasError = false;

    // Check if API Key is placeholder or missing
    const isInvalidKey =
      !apiKey ||
      apiKey === "" ||
      apiKey.includes("YOUR_OPENROUTER_API_KEY") ||
      apiKey.includes("KEY_BARU_KAMU") ||
      apiKey.includes("YOUR_KEY");

    if (isInvalidKey) {
      // Immediate fast fallback response (0 ms delay)
      aiTextResult = fallbackResponse();
    } else {
      // Try models sequentially
      for (const targetModel of OPENROUTER_MODELS) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout per model

          const response = await fetch(OPENROUTER_ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": "https://moshassolusi.com",
              "X-Title": "PT Mosha AI Consultant",
            },
            body: JSON.stringify({
              model: targetModel,
              messages: openRouterMessages,
              temperature: 0.7,
              max_tokens: 800,
              reasoning: { effort: "none" },
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const rawContent = data?.choices?.[0]?.message?.content;
            if (rawContent && typeof rawContent === "string") {
              // Strip <think>...</think> reasoning tags if any
              let cleaned = rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

              // Strip leaked English reasoning preamble if any
              if (/^(?:okay|the user|first,|let me unpack|looking at the)/i.test(cleaned)) {
                const marker = cleaned.search(/(?:\n\n|\r\n\r\n)(?:Halo|Hai|Selamat|Tentu|Menarik|Wah|Keren|Untuk|Mengenai|Program|Pelatihan|Terkait|Commissioning)/i);
                if (marker !== -1) {
                  cleaned = cleaned.substring(marker).trim();
                }
              }

              if (cleaned) {
                aiTextResult = cleaned;
                hasError = false;
                break; // Success!
              }
            }
          } else {
            const errText = await response.text();
            console.warn(`Model ${targetModel} returned status ${response.status}:`, errText);
          }
        } catch (err: any) {
          console.warn(`Model ${targetModel} fetch error:`, err?.message || err);
        }
      }

      // If all models failed or rate-limited, use intelligent fallback response
      if (!aiTextResult) {
        hasError = true;
        aiTextResult = fallbackResponse();
      }
    }

    // Determine if recommendation cards should be displayed alongside response
    // Strict rule: ONLY display recommendation cards when user explicitly asks for recommendations
    const userQueryLower = args.userMessage.toLowerCase();
    const shouldAttachCards =
      calculatedRecommendations.length > 0 &&
      (userQueryLower.includes("rekomendasi") ||
        userQueryLower.includes("rekomendasikan") ||
        userQueryLower.includes("saran pelatihan") ||
        userQueryLower.includes("pelatihan apa yang cocok") ||
        userQueryLower.includes("cari pelatihan yang cocok"));

    const finalRecommendations = shouldAttachCards ? calculatedRecommendations : undefined;

    // Save assistant message to database
    await ctx.runMutation(api.sessions.saveChatMessage, {
      sessionId: args.sessionId,
      role: "assistant",
      content: aiTextResult,
      recommendations: finalRecommendations,
    });

    return {
      text: aiTextResult,
      recommendations: finalRecommendations || null,
      hasError,
    };
  },
});

function extractProfileFromMessage(
  userMsg: string,
  existingProfile: any
): Partial<any> | null {
  const text = userMsg.toLowerCase();
  const update: any = {};

  if (text.includes("mahasiswa") || text.includes("kuliah") || text.includes("kampus")) {
    update.occupation = "Mahasiswa";
    update.level = "Pemula";
  } else if (text.includes("teknisi") || text.includes("fitter")) {
    update.occupation = "Teknisi";
  } else if (text.includes("engineer") || text.includes("insinyur")) {
    update.occupation = "Engineer";
  } else if (text.includes("fresh graduate") || text.includes("lulusan baru")) {
    update.experience = "Fresh Graduate";
    update.level = "Pemula";
  }

  // Detect education / field of study
  if (/\b(it|ti|informatika|komputer|software)\b/i.test(text)) {
    update.education = "Teknologi Informasi (IT)";
  } else if (text.includes("akuntan") || text.includes("akuntansi") || text.includes("keuangan")) {
    update.education = "Akuntansi & Keuangan";
  } else if (text.includes("mesin") || text.includes("mechanical")) {
    update.education = "Teknik Mesin";
  } else if (text.includes("elektro") || text.includes("listrik")) {
    update.education = "Teknik Elektro";
  }

  const interests: string[] = existingProfile?.interests ? [...existingProfile.interests] : [];
  if (/\bai\b/i.test(text) || text.includes("intelligence") || text.includes("kecerdasan buatan")) {
    if (!interests.includes("AI")) interests.push("AI");
  }
  if (text.includes("oil") || /\bgas\b/.test(text) || text.includes("migas")) {
    if (!interests.includes("Oil & Gas")) interests.push("Oil & Gas");
  }
  if (text.includes("plts") || text.includes("solar") || text.includes("surya") || text.includes("energi terbarukan")) {
    if (!interests.includes("PLTS")) interests.push("PLTS");
  }
  if (text.includes("k3") || text.includes("safety") || text.includes("hse")) {
    if (!interests.includes("K3 Safety")) interests.push("K3 Safety");
  }
  if (text.includes("piping") || text.includes("mechanical")) {
    if (!interests.includes("Mechanical & Piping")) interests.push("Mechanical & Piping");
  }
  if (text.includes("commissioning")) {
    if (!interests.includes("Commissioning")) interests.push("Commissioning");
  }
  if (interests.length > 0) {
    update.interests = interests;
  }

  if (text.includes("sertifikat") || text.includes("sertifikasi") || text.includes("bnsp") || text.includes("kebtke")) {
    update.goals = Array.from(new Set([...(existingProfile?.goals || []), "Sertifikasi"]));
  }
  if (text.includes("karier") || /\bkerja\b/.test(text) || text.includes("pekerjaan") || text.includes("karir")) {
    update.goals = Array.from(new Set([...(existingProfile?.goals || []), "Pengembangan Karier"]));
  }

  return Object.keys(update).length > 0 ? update : null;
}
