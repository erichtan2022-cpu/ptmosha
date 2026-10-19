import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { motion } from "motion/react";
import {
  Search,
  Award,
  CheckCircle2,
  Calendar,
  FileCheck2,
  Building,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Filter,
  RefreshCw,
  Clock,
  ChevronRight,
} from "lucide-react";
import SEOHead from "@/components/seo/seo-head.tsx";
import PageHero from "@/components/layout/page-hero.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import DigitalCertificateModal from "@/components/training/digital-certificate-modal.tsx";
import {
  type GraduateRecord,
  INITIAL_GRADUATES_LIST,
} from "@/data/graduates-data.ts";

const HERO_IMAGE =
  "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "Renewable Energy (PLTS)", label: "Renewable Energy (PLTS)" },
  { id: "Commissioning & Engineering", label: "Commissioning & Engineering" },
];

export default function VerifikasiSertifikatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const certParam = searchParams.get("cert") || "";

  const [searchTerm, setSearchTerm] = useState(certParam);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGraduate, setSelectedGraduate] = useState<GraduateRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Try querying Convex database
  const convexGraduates = useQuery(api.graduates.listGraduates, {
    searchQuery: searchTerm ? searchTerm : undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
  });

  // Harmonize data: use Convex if returned and has items, otherwise fallback to rich local verified dataset
  const graduatesList: GraduateRecord[] = useMemo(() => {
    if (convexGraduates && convexGraduates.length > 0) {
      return convexGraduates.map((g: any) => ({
        id: g._id || g.id,
        fullName: g.fullName,
        completionDate: g.completionDate,
        trainingTopic: g.trainingTopic,
        trainingCategory: g.trainingCategory || "Pelatihan Profesional",
        certificateNumber: g.certificateNumber,
        institution: g.institution,
        grade: g.grade,
        hours: g.hours,
        status: (g.status as "verified") || "verified",
        notes: g.notes,
        issuer: "PT Mosha Sinalsal Solusi",
        signatory1: {
          name: "Ir. Mosha Sinalsal, M.T., IPM.",
          role: "Direktur Utama PT Mosha Sinalsal Solusi",
        },
        signatory2: {
          name: "Ir. Ardiansyah, S.T., M.Eng.",
          role: "Lead Trainer & Commissioning Specialist",
        },
      }));
    }

    // Fallback to local verified list with client filtering
    let list = INITIAL_GRADUATES_LIST;
    if (selectedCategory !== "all") {
      list = list.filter((g) => g.trainingCategory === selectedCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.fullName.toLowerCase().includes(q) ||
          (g.certificateNumber ? g.certificateNumber.toLowerCase().includes(q) : false) ||
          g.trainingTopic.toLowerCase().includes(q) ||
          (g.institution && g.institution.toLowerCase().includes(q))
      );
    }
    return list;
  }, [convexGraduates, searchTerm, selectedCategory]);

  // Handle URL param ?cert=MSS-CERT... to automatically open matching certificate
  useEffect(() => {
    if (certParam) {
      const match = INITIAL_GRADUATES_LIST.find(
        (g) => g.certificateNumber && g.certificateNumber.toLowerCase() === certParam.toLowerCase().trim()
      );
      if (match) {
        setSelectedGraduate(match);
        setIsModalOpen(true);
      }
    }
  }, [certParam]);

  const handleOpenCertificate = (graduate: GraduateRecord) => {
    setSelectedGraduate(graduate);
    setIsModalOpen(true);
    // Optionally reflect in search params
    setSearchParams({ cert: graduate.certificateNumber }, { replace: true });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear cert param from URL if present
    if (certParam) {
      setSearchParams({}, { replace: true });
    }
  };

  // Stats computation
  const totalVerified = graduatesList.length;

  return (
    <>
      <SEOHead
        title="Direktori Kelulusan & Verifikasi Sertifikat Training"
        path="/verifikasi-sertifikat"
        description="Database resmi peserta lulus pelatihan PT Mosha Sinalsal Solusi. Verifikasi keaslian sertifikat, nomor registrasi, tanggal kelulusan, dan topik pelatihan PLTS, Oil & Gas, serta Commissioning."
        keywords="verifikasi sertifikat, database kelulusan, alumni training mosha, sertifikat commissioning, sertifikat PLTS, nomor registrasi sertifikat batam"
      />

      <PageHero
        label="Official Credential Verification"
        title="Direktori Kelulusan & Sertifikat"
        description="Database resmi peserta yang telah menyelesaikan program pelatihan profesional PT Mosha Sinalsal Solusi. Cek keaslian sertifikat, tanggal kelulusan, dan kompetensi yang diraih."
        image={HERO_IMAGE}
      />

      <section className="py-10 sm:py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Highlights Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Status Database
                </p>
                <h4 className="text-base font-bold text-foreground">
                  100% Terverifikasi Resmi
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-accent/15 text-accent">
                <GraduationCap className="size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Alumni Terdata
                </p>
                <h4 className="text-base font-bold text-foreground">
                  {totalVerified} Peserta Tersertifikasi
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary dark:text-primary-foreground">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  Sertifikat Digital
                </p>
                <h4 className="text-base font-bold text-foreground">
                  Dilengkapi QR Verifikasi
                </h4>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari nama peserta, nomor sertifikat (cth: MSS-CERT...), atau instansi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 text-sm bg-background border-border/80 focus:border-accent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground cursor-pointer px-1.5 py-0.5 rounded bg-muted"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-muted-foreground font-medium mr-1 flex items-center gap-1">
                  <Filter className="size-3.5" />
                  Kategori:
                </span>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/50">
              <span>
                Menampilkan <strong>{graduatesList.length}</strong> data peserta yang telah menyelesaikan pelatihan
              </span>
              {searchTerm && (
                <span className="font-medium text-accent">
                  Hasil pencarian untuk &ldquo;{searchTerm}&rdquo;
                </span>
              )}
            </div>
          </div>

          {/* Graduates List Table (Desktop) & Cards (Mobile) */}
          {graduatesList.length > 0 ? (
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                      <tr>
                        <th className="px-6 py-4">Peserta &amp; Instansi</th>
                        <th className="px-6 py-4">Topik Training</th>
                        <th className="px-6 py-4">Tanggal Selesai</th>
                        <th className="px-6 py-4">No. Sertifikat</th>
                        <th className="px-6 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {graduatesList.map((grad, idx) => (
                        <motion.tr
                          key={grad.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="hover:bg-muted/30 transition-colors group"
                        >
                          {/* Nama & Instansi */}
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-3">
                              <div className="size-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 dark:text-primary-foreground">
                                {grad.fullName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">
                                  {grad.fullName}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <Building className="size-3 text-muted-foreground/70" />
                                  {grad.institution || "Mandiri / Profesional"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Topik Training */}
                          <td className="px-6 py-4 max-w-xs">
                            <p className="font-semibold text-foreground text-sm line-clamp-2">
                              {grad.trainingTopic}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className="text-[10px] font-medium py-0 px-1.5 border-border text-muted-foreground"
                              >
                                {grad.trainingCategory}
                              </Badge>
                              {grad.hours && (
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="size-3 text-amber-500" />
                                  {grad.hours}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Tanggal Selesai */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                              <Calendar className="size-3.5 text-muted-foreground" />
                              {grad.completionDate}
                            </div>
                            {grad.grade && (
                              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-0.5">
                                {grad.grade}
                              </span>
                            )}
                          </td>

                          {/* Nomor Sertifikat & Badge */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              {grad.certificateNumber ? (
                                <span className="font-mono text-xs font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded border border-border">
                                  {grad.certificateNumber}
                                </span>
                              ) : (
                                <span className="font-mono text-xs text-muted-foreground bg-muted/40 px-2.5 py-0.5 rounded border border-border/50">
                                  -
                                </span>
                              )}
                              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                <CheckCircle2 className="size-3" />
                                Terverifikasi
                              </div>
                            </div>
                          </td>

                          {/* Aksi */}
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            {grad.certificateNumber ? (
                              <Button
                                size="sm"
                                onClick={() => handleOpenCertificate(grad)}
                                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs h-8 gap-1.5 cursor-pointer shadow-xs"
                              >
                                <Award className="size-3.5" />
                                Lihat Sertifikat
                              </Button>
                            ) : (
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-muted-foreground border border-border/60"
                                title="Sertifikat resmi diterbitkan langsung oleh PT Mosha Sinalsal Solusi & MASEBI"
                              >
                                <FileCheck2 className="size-3.5 text-accent" />
                                Sertifikat Mandiri
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {graduatesList.map((grad, idx) => (
                  <motion.div
                    key={grad.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground text-base">
                          {grad.fullName}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Building className="size-3 text-muted-foreground/70" />
                          {grad.institution || "Mandiri / Profesional"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] font-semibold gap-1 dark:bg-emerald-950/40 dark:text-emerald-300 shrink-0"
                      >
                        <CheckCircle2 className="size-2.5" />
                        Valid
                      </Badge>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/40 border border-border/60 space-y-1.5 text-xs">
                      <p className="font-semibold text-foreground">
                        {grad.trainingTopic}
                      </p>
                      <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1 border-t border-border/40">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3 text-amber-600" />
                          {grad.completionDate}
                        </span>
                        {grad.hours && <span>{grad.hours}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="text-[11px] font-mono text-muted-foreground">
                        No. Sertifikat:{" "}
                        <span className="font-bold text-foreground">
                          {grad.certificateNumber || "-"}
                        </span>
                      </div>
                      {grad.certificateNumber ? (
                        <Button
                          size="sm"
                          onClick={() => handleOpenCertificate(grad)}
                          className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-8 gap-1.5 font-semibold cursor-pointer"
                        >
                          <Award className="size-3.5" />
                          Lihat Sertifikat
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1 bg-muted/60 px-2.5 py-1 rounded-md border border-border/50">
                          <FileCheck2 className="size-3 text-accent" />
                          Sertifikat Mandiri
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="p-12 text-center rounded-2xl bg-card border border-border shadow-xs space-y-3">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                <Search className="size-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                Tidak Ditemukan Data Kelulusan
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Tidak ada data peserta yang cocok dengan kata kunci &ldquo;{searchTerm}&rdquo;. Pastikan ejaan nama atau nomor sertifikat sudah sesuai.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-xs cursor-pointer"
              >
                Reset Pencarian
              </Button>
            </div>
          )}

          {/* Verification Guarantee & Admin Support Footer */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="size-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Verifikasi Keabsahan Dokumen Perusahaan &amp; Institusi
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed max-w-2xl">
                    Semua sertifikat yang tertera di direktori ini diterbitkan secara sah oleh PT Mosha Sinalsal Solusi berdasarkan hasil evaluasi kelulusan program pelatihan. Bagi pihak HRD atau instansi yang memerlukan surat verifikasi resmi tertulis, silakan hubungi tim kami.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/62822268195332?text=Halo%20Admin%20PT%20Mosha,%20saya%20ingin%20mengonfirmasi%20keaslian%20sertifikat%20peserta%20training"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs font-semibold gap-1.5 cursor-pointer border-accent/40 text-foreground hover:bg-accent/10"
                >
                  <ExternalLink className="size-3.5" />
                  Hubungi Admin Verifikasi
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Certificate Viewer Modal */}
      <DigitalCertificateModal
        graduate={selectedGraduate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
