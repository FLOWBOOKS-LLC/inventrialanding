export const REGISTRATION_OPTIONS = [
  "Never registered with the NDPC (first-time client)",
  "Registered before — certificate attached / number provided",
  "Not sure",
] as const;

export const EXISTING_CONTROLS = [
  "NDPC registration / certificate",
  "Previous CAR filing",
  "Privacy notice / policy",
  "Internal data protection policy",
  "Processor / vendor contracts with DP clauses",
  "DPIA(s) completed",
  "Legitimate Interest Assessment(s) (LIA)",
  "Breach / incident response procedure",
  "Data subject rights request process",
  "Training records for staff",
  "Evidence folder for last audit",
  "Nothing yet — starting from scratch",
] as const;

export const REQUESTED_SERVICES = [
  "Classification & registration advisory (Sch.7)",
  "Full annual CAR audit & filing pack (Sch.2)",
  "Evidence collection & gap remediation plan",
  "DPO appointment / scoring support (Sch.3)",
  "DPIA support (Sch.4)",
  "LIA support (Sch.8)",
  "Processor & cross-border registers",
  "Findings / remediation tracking",
  "Staff awareness training",
  "Ongoing retainer (quarterly reviews)",
] as const;

export const ASSESSMENT_STEPS = [
  { id: "organisation", title: "Organisation profile" },
  { id: "contact", title: "Contact & governance" },
  { id: "dataVolume", title: "Personal data volume" },
  { id: "systems", title: "Systems & processing" },
  { id: "status", title: "Current compliance status" },
  { id: "services", title: "What you want from us" },
  { id: "budget", title: "Budget & declaration" },
] as const;
