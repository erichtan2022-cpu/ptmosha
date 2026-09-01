import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CONSULTANTS: string[] = [
  "Engineering, Construction, QC Inspection, Commissioning, Operation & Maintenance",
  "Commissioning Oil & Gas dan Sistem Pembangkit Listrik",
  "Solar PV - Pembangkit Listrik Tenaga Surya (PLTS)",
  "Automation, Electrical & Instrument",
  "Audit Energy & Energy Management",
  "Green House Gas (GHG) Emission Accounting & Reporting",
  "Renewable Energy & Sustainability",
  "Waste Management",
  "Water Treatment",
  "Environment, Social, Governance (ESG)",
  "Environment, Social, Governance, Risk & Compliance (ESGRC)",
  "Project Management",
  "Quality Management",
  "Operation Management",
  "Continuous Improvement",
  "Safety K3",
  "Corporate & Leadership Training",
  "Soft Skills & Public Training",
  "Executive Coaching",
  "Supply Chain Management, Shipping & Logistics",
  "People Development & Restructuring",
  "Headhunter & HR Consulting",
];

export default function ConsultantList() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
                  <TableHead className="font-semibold text-foreground">List Consultant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CONSULTANTS.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="text-center font-medium text-muted-foreground">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {item}
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
