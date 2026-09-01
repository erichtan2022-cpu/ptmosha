import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Training = {
  no: number;
  topic: string;
  duration: string;
  mode: string;
  notes: string;
};

const TRAININGS: Training[] = [
  { no: 1, topic: "Commissioning Oil & Gas dan Sistem Pembangkit Listrik", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 2, topic: "Commissioning Oil & Gas dan Sistem Pembangkit Listrik", duration: "2 x 5 jam", mode: "Offline (Tatap muka)", notes: "4 hingga 12 peserta" },
  { no: 3, topic: "Commissioning Mechanical & Piping", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 4, topic: "Commissioning Electrical & Instrument", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 5, topic: "Tube Fitting & Tube Bending", duration: "2 x 5 jam", mode: "Online & Offline", notes: "-" },
  { no: 6, topic: "PLTS - Pembangkit Listrik Tenaga Surya (Teori)", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 7, topic: "PLTS - Pembangkit Listrik Tenaga Surya (Teori & Praktik)", duration: "3 x 2,5 jam", mode: "Online & Offline", notes: "-" },
  { no: 8, topic: "PLTS - Training dan Sertifikasi", duration: "3 x 5 jam", mode: "Online & Offline", notes: "Sertifikasi KEBTKE" },
  { no: 9, topic: "PV Syst/Helioscope - Design PLTS", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 10, topic: "HOMER PRO - Design PLTS Hybrid", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 11, topic: "Waste Management", duration: "-", mode: "-", notes: "-" },
  { no: 12, topic: "Audit Energy & Energy Management", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 13, topic: "Green House Gas (GHG) Emission Accounting & Reporting", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 14, topic: "Green House Gas (GHG) Emission Accounting & Reporting", duration: "2 x 5 jam", mode: "Offline (Tatap muka)", notes: "Minimal 8 peserta" },
  { no: 15, topic: "Environment, Social, Governance (ESG)", duration: "-", mode: "Online & Offline", notes: "Sertifikasi BNSP" },
  { no: 16, topic: "Environment, Social, Governance, Risk & Compliance (ESGRC)", duration: "-", mode: "Online & Offline", notes: "Sertifikasi BNSP" },
  { no: 17, topic: "Project Management Professional (PMP)", duration: "-", mode: "Online & Offline", notes: "Sertifikasi BNSP" },
  { no: 18, topic: "Microsoft Project - Project Management", duration: "2 x 2 jam", mode: "Online", notes: "-" },
  { no: 19, topic: "Drafter / Autocad", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 20, topic: "Continuous Improvement", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 21, topic: "Continuous Improvement", duration: "2 x 5 jam", mode: "Offline (Tatap muka)", notes: "7 hingga 12 peserta" },
  { no: 22, topic: "Statistic (Minitab)", duration: "2 x 2,5 jam", mode: "Online", notes: "-" },
  { no: 23, topic: "Statistic (Minitab)", duration: "2 x 5 jam", mode: "Offline (Tatap muka)", notes: "7 hingga 12 peserta" },
  { no: 24, topic: "K3 Umum", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 25, topic: "K3 Listrik", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 26, topic: "K3 Alat Angkut", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 27, topic: "K3 dan Sertifikasi BNSP", duration: "-", mode: "Online & Offline", notes: "Sertifikasi BNSP" },
  { no: 28, topic: "Design Website", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 29, topic: "Corporate & Leadership Training", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 30, topic: "Soft Skills & Public Training", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 31, topic: "Executive Coaching", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 32, topic: "Microsoft Apps & AI Training", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 33, topic: "Headhunter & HR Consulting", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 34, topic: "Supply Chain Management, Shipping & Logistics", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 35, topic: "Sertifikasi Kompetensi Pembangkit Listrik Tenaga Sampah (PLTSa)", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 36, topic: "Sertifikasi Kompetensi Sektor Instalasi Pembangkit Listrik (IPTL)", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 37, topic: "Sertifikasi Kompetensi Sektor Pembangkit Listrik Tenaga Diesel (PLTD)", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 38, topic: "Sertifikasi Kompetensi Auditor Energi dan Manajer Energi", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 39, topic: "Sertifikasi Ahli Daur Hidup (Life Cycle Assessment - LCA)", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 40, topic: "Sertifikasi Keahlian Penghitungan Nilai Daur Hidup (KPLCA)", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 41, topic: "Sertifikasi Sistem Informasi Geografis", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 42, topic: "Sertifikasi Microsoft Office", duration: "-", mode: "Online & Offline", notes: "-" },
  { no: 43, topic: "Sertifikasi Autodesk", duration: "-", mode: "Online & Offline", notes: "-" },
];

function modeBadgeClass(mode: string) {
  if (mode === "Online") return "bg-blue-100 text-blue-700 border-blue-200";
  if (mode.startsWith("Offline")) return "bg-amber-100 text-amber-700 border-amber-200";
  if (mode === "Online & Offline") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  return "bg-muted text-muted-foreground border-border";
}

export default function TrainingTable() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead className="w-16 text-center font-semibold text-foreground">No</TableHead>
                  <TableHead className="min-w-[280px] font-semibold text-foreground">Topik Training</TableHead>
                  <TableHead className="w-32 font-semibold text-foreground">Durasi</TableHead>
                  <TableHead className="w-44 font-semibold text-foreground">Online / Offline</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-foreground">Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRAININGS.map((t) => (
                  <TableRow key={t.no}>
                    <TableCell className="text-center font-medium text-muted-foreground">
                      {t.no}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {t.topic}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.duration}
                    </TableCell>
                    <TableCell>
                      {t.mode === "-" ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <Badge variant="outline" className={`whitespace-nowrap ${modeBadgeClass(t.mode)}`}>
                          {t.mode}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.notes === "Sertifikasi BNSP" || t.notes === "Sertifikasi KEBTKE" ? (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 whitespace-nowrap">
                          {t.notes}
                        </Badge>
                      ) : (
                        t.notes
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
