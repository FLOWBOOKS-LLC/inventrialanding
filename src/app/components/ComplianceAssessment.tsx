import { useMemo, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  ASSESSMENT_STEPS,
  EXISTING_CONTROLS,
  REGISTRATION_OPTIONS,
  REQUESTED_SERVICES,
} from "@/app/constants/complianceAssessment";
import { submitComplianceAssessment } from "@/app/lib/assessmentApi";

interface ComplianceAssessmentProps {
  onNavigate?: (page: string) => void;
}

type FormState = {
  organisation: {
    legalName: string;
    tradingName: string;
    rcNumber: string;
    headOfficeAddress: string;
    website: string;
    industry: string;
    commencedDate: string;
    employees: string;
    statesCountries: string;
    controllerProcessor: string;
  };
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
    hasDpo: string;
    dpoName: string;
    dpoEnrolled: string;
    carApprover: string;
    preferredTimeline: string;
  };
  dataVolume: {
    dataSubjects6Months: string;
    estimateMethod: string;
    subjectCategories: string;
    sensitiveData: string;
    filingSystem: string;
  };
  systems: {
    coreSystems: string;
    cloudVendors: string;
    crossBorder: string;
    aiAutomated: string;
    highestRisk: string;
  };
  registrationStatus: string;
  registrationNumber: string;
  previousCarYear: string;
  existingControls: string[];
  requestedServices: string[];
  requestedOther: string;
  budget: {
    budgetRange: string;
    ndpcFeePayer: string;
    hardDeadline: string;
  };
  declaration: {
    name: string;
    role: string;
    date: string;
    confirmed: boolean;
  };
};

const initialForm: FormState = {
  organisation: {
    legalName: "",
    tradingName: "",
    rcNumber: "",
    headOfficeAddress: "",
    website: "",
    industry: "",
    commencedDate: "",
    employees: "",
    statesCountries: "",
    controllerProcessor: "",
  },
  contact: {
    name: "",
    role: "",
    email: "",
    phone: "",
    hasDpo: "",
    dpoName: "",
    dpoEnrolled: "",
    carApprover: "",
    preferredTimeline: "",
  },
  dataVolume: {
    dataSubjects6Months: "",
    estimateMethod: "",
    subjectCategories: "",
    sensitiveData: "",
    filingSystem: "",
  },
  systems: {
    coreSystems: "",
    cloudVendors: "",
    crossBorder: "",
    aiAutomated: "",
    highestRisk: "",
  },
  registrationStatus: "",
  registrationNumber: "",
  previousCarYear: "",
  existingControls: [],
  requestedServices: [],
  requestedOther: "",
  budget: {
    budgetRange: "",
    ndpcFeePayer: "",
    hardDeadline: "",
  },
  declaration: {
    name: "",
    role: "",
    date: new Date().toISOString().slice(0, 10),
    confirmed: false,
  },
};

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-[#0b3574] focus:ring-2 focus:ring-[#0b3574]/15";

export function ComplianceAssessment({ onNavigate }: ComplianceAssessmentProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const progress = useMemo(() => ((step + 1) / ASSESSMENT_STEPS.length) * 100, [step]);

  const toggleListValue = (key: "existingControls" | "requestedServices", value: string) => {
    setForm((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const validateStep = () => {
    if (step === 0 && !form.organisation.legalName.trim()) {
      return "Legal name is required.";
    }
    if (step === 1) {
      if (!form.contact.name.trim() || !form.contact.email.trim()) {
        return "Primary contact name and email are required.";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact.email.trim())) {
        return "Enter a valid contact email.";
      }
    }
    if (step === 4 && !form.registrationStatus) {
      return "Select your NDPC registration status.";
    }
    if (step === 6) {
      if (!form.declaration.name.trim() || !form.declaration.role.trim()) {
        return "Declaration name and role are required.";
      }
      if (!form.declaration.confirmed) {
        return "Please confirm the declaration before submitting.";
      }
    }
    return null;
  };

  const goNext = () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, ASSESSMENT_STEPS.length - 1));
  };

  const handleSubmit = async () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      organisation: { ...form.organisation },
      contact: {
        name: form.contact.name,
        role: form.contact.role,
        email: form.contact.email,
        phone: form.contact.phone,
        hasDpo: form.contact.hasDpo,
        dpoName: form.contact.dpoName,
        dpoEnrolled: form.contact.dpoEnrolled,
        carApprover: form.contact.carApprover,
        preferredTimeline: form.contact.preferredTimeline,
      },
      dataVolume: { ...form.dataVolume },
      systems: { ...form.systems },
      registrationStatus: form.registrationStatus,
      existingControls: [
        ...form.existingControls,
        ...(form.registrationNumber
          ? [`Registration / certificate number: ${form.registrationNumber}`]
          : []),
        ...(form.previousCarYear ? [`Previous CAR year: ${form.previousCarYear}`] : []),
      ],
      requestedServices: form.requestedServices,
      requestedOther: form.requestedOther,
      budget: { ...form.budget },
      declaration: {
        name: form.declaration.name,
        role: form.declaration.role,
        date: form.declaration.date,
        confirmed: form.declaration.confirmed ? "Yes" : "No",
      },
    };

    try {
      await submitComplianceAssessment(payload);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-background text-foreground min-h-[70vh] flex items-center">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-semibold mb-3">Assessment submitted</h1>
          <p className="text-muted-foreground mb-6">
            Thank you. We emailed a copy to <strong>{form.contact.email}</strong> and notified{" "}
            <strong>muhammad.fahad@flowbooks.org</strong>. Our team will review your answers and
            send a tailored NDPR data compliance proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="text-white"
              style={{ backgroundColor: "#0b3574" }}
              onClick={() => onNavigate?.("compliance")}
            >
              Back to NDPR Data Compliance
            </Button>
            <Button variant="outline" onClick={() => onNavigate?.("home")}>
              Go home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground transition-colors" style={{ fontFamily: "Roboto, sans-serif" }}>
      <section
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 20%, #1a2942 50%, #0b3574 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 lg:px-6 relative z-10 text-white text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] mb-4">
            <ClipboardList className="w-3.5 h-3.5" />
            Client assessment pack
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            NDPR data compliance assessment
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Complete this NDPR / NDP Act / GAID assessment. We will review your answers and send a proposal
            with classification guidance and fee lines (NDPC fees + professional fees).
          </p>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-foreground">
                Step {step + 1} of {ASSESSMENT_STEPS.length}: {ASSESSMENT_STEPS[step].title}
              </span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "#0b3574" }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm space-y-5">
            {step === 0 && (
              <>
                <Field label="1.1 Legal name" required>
                  <input
                    className={inputClass}
                    value={form.organisation.legalName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, legalName: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="1.2 Trading name (if different)">
                  <input
                    className={inputClass}
                    value={form.organisation.tradingName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, tradingName: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="1.3 RC / registration number">
                  <input
                    className={inputClass}
                    value={form.organisation.rcNumber}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, rcNumber: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="1.4 Head office address">
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={form.organisation.headOfficeAddress}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, headOfficeAddress: e.target.value },
                      }))
                    }
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="1.5 Website">
                    <input
                      className={inputClass}
                      value={form.organisation.website}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organisation: { ...prev.organisation, website: e.target.value },
                        }))
                      }
                    />
                  </Field>
                  <Field label="1.6 Industry / sector">
                    <input
                      className={inputClass}
                      placeholder="finance, health, education, ICT…"
                      value={form.organisation.industry}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organisation: { ...prev.organisation, industry: e.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="1.7 Date business commenced">
                    <input
                      className={inputClass}
                      value={form.organisation.commencedDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organisation: { ...prev.organisation, commencedDate: e.target.value },
                        }))
                      }
                    />
                  </Field>
                  <Field label="1.8 Number of employees (approx.)">
                    <input
                      className={inputClass}
                      value={form.organisation.employees}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          organisation: { ...prev.organisation, employees: e.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="1.9 States / countries of operation">
                  <input
                    className={inputClass}
                    value={form.organisation.statesCountries}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, statesCountries: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="1.10 Are you mainly a controller, processor, or both?">
                  <select
                    className={inputClass}
                    value={form.organisation.controllerProcessor}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        organisation: { ...prev.organisation, controllerProcessor: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select…</option>
                    <option value="Controller">Controller</option>
                    <option value="Processor">Processor</option>
                    <option value="Both">Both</option>
                  </select>
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="2.1 Primary contact name" required>
                    <input
                      className={inputClass}
                      value={form.contact.name}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, name: e.target.value },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      className={inputClass}
                      value={form.contact.role}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, role: e.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="2.2 Email" required>
                    <input
                      type="email"
                      className={inputClass}
                      value={form.contact.email}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, email: e.target.value },
                        }))
                      }
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      className={inputClass}
                      value={form.contact.phone}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, phone: e.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="2.3 Do you have a DPO?">
                    <select
                      className={inputClass}
                      value={form.contact.hasDpo}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, hasDpo: e.target.value },
                        }))
                      }
                    >
                      <option value="">Select…</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Field>
                  <Field label="DPO name (if any)">
                    <input
                      className={inputClass}
                      value={form.contact.dpoName}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, dpoName: e.target.value },
                        }))
                      }
                    />
                  </Field>
                </div>
                <Field label="2.4 Is the DPO enrolled / recognised under NDPC rules?">
                  <input
                    className={inputClass}
                    value={form.contact.dpoEnrolled}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, dpoEnrolled: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="2.5 Who will approve the CAR internally? (name/role)">
                  <input
                    className={inputClass}
                    value={form.contact.carApprover}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, carApprover: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="2.6 Preferred timeline (e.g. file before 31 Mar ____)">
                  <input
                    className={inputClass}
                    value={form.contact.preferredTimeline}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        contact: { ...prev.contact, preferredTimeline: e.target.value },
                      }))
                    }
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field label="3.1 Approx. number of data subjects in a typical 6-month period">
                  <input
                    className={inputClass}
                    value={form.dataVolume.dataSubjects6Months}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        dataVolume: { ...prev.dataVolume, dataSubjects6Months: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="3.2 How did you estimate this?">
                  <input
                    className={inputClass}
                    placeholder="CRM, HR, customers, app users…"
                    value={form.dataVolume.estimateMethod}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        dataVolume: { ...prev.dataVolume, estimateMethod: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="3.3 Main categories of data subjects">
                  <input
                    className={inputClass}
                    placeholder="customers, staff, patients, students…"
                    value={form.dataVolume.subjectCategories}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        dataVolume: { ...prev.dataVolume, subjectCategories: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="3.4 Children’s data, health, biometrics, or other sensitive data?">
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={form.dataVolume.sensitiveData}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        dataVolume: { ...prev.dataVolume, sensitiveData: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="3.5 Do you keep or access a filing system for personal data?">
                  <select
                    className={inputClass}
                    value={form.dataVolume.filingSystem}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        dataVolume: { ...prev.dataVolume, filingSystem: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select…</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field label="4.1 Core systems that hold personal data">
                  <textarea
                    className={inputClass}
                    rows={2}
                    placeholder="ERP, CRM, HRIS, EHR, mobile app…"
                    value={form.systems.coreSystems}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        systems: { ...prev.systems, coreSystems: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="4.2 Cloud providers / vendors processing data (name + country)">
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={form.systems.cloudVendors}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        systems: { ...prev.systems, cloudVendors: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="4.3 Do you transfer personal data outside Nigeria?">
                  <input
                    className={inputClass}
                    placeholder="Yes/No + countries"
                    value={form.systems.crossBorder}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        systems: { ...prev.systems, crossBorder: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="4.4 Do you use AI / automated decision-making on individuals?">
                  <input
                    className={inputClass}
                    value={form.systems.aiAutomated}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        systems: { ...prev.systems, aiAutomated: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="4.5 Highest-risk processing activity">
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={form.systems.highestRisk}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        systems: { ...prev.systems, highestRisk: e.target.value },
                      }))
                    }
                  />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field label="Registration status" required>
                  <div className="space-y-2">
                    {REGISTRATION_OPTIONS.map((option) => (
                      <label
                        key={option}
                        className="flex items-start gap-3 rounded-xl border border-border px-3 py-3 cursor-pointer hover:border-[#0b3574]/40"
                      >
                        <input
                          type="radio"
                          className="mt-1"
                          checked={form.registrationStatus === option}
                          onChange={() => setForm((prev) => ({ ...prev, registrationStatus: option }))}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Registration / certificate number (if any)">
                  <input
                    className={inputClass}
                    value={form.registrationNumber}
                    onChange={(e) => setForm((prev) => ({ ...prev, registrationNumber: e.target.value }))}
                  />
                </Field>
                <Field label="Previous CAR filing year (if any)">
                  <input
                    className={inputClass}
                    value={form.previousCarYear}
                    onChange={(e) => setForm((prev) => ({ ...prev, previousCarYear: e.target.value }))}
                  />
                </Field>
                <div>
                  <div className="text-sm font-medium mb-3">Tick what you already have</div>
                  <div className="space-y-2">
                    {EXISTING_CONTROLS.map((item) => (
                      <label key={item} className="flex items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={form.existingControls.includes(item)}
                          onChange={() => toggleListValue("existingControls", item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div>
                  <div className="text-sm font-medium mb-3">What you want from us (tick all that apply)</div>
                  <div className="space-y-2">
                    {REQUESTED_SERVICES.map((item) => (
                      <label key={item} className="flex items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={form.requestedServices.includes(item)}
                          onChange={() => toggleListValue("requestedServices", item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Field label="Other requests">
                  <input
                    className={inputClass}
                    value={form.requestedOther}
                    onChange={(e) => setForm((prev) => ({ ...prev, requestedOther: e.target.value }))}
                  />
                </Field>
              </>
            )}

            {step === 6 && (
              <>
                <Field label="7.1 Approximate budget range for professional fees (optional)">
                  <input
                    className={inputClass}
                    value={form.budget.budgetRange}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        budget: { ...prev.budget, budgetRange: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="7.2 Who pays NDPC filing fees — you directly, or via us as disbursement?">
                  <input
                    className={inputClass}
                    value={form.budget.ndpcFeePayer}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        budget: { ...prev.budget, ndpcFeePayer: e.target.value },
                      }))
                    }
                  />
                </Field>
                <Field label="7.3 Any hard deadline or regulator correspondence already received?">
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={form.budget.hardDeadline}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        budget: { ...prev.budget, hardDeadline: e.target.value },
                      }))
                    }
                  />
                </Field>

                <div className="rounded-xl border border-[#0b3574]/20 bg-[#0b3574]/5 p-4 space-y-4">
                  <p className="text-sm text-foreground">
                    <strong>Declaration:</strong> The information above is true to the best of my knowledge.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Name" required>
                      <input
                        className={inputClass}
                        value={form.declaration.name}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            declaration: { ...prev.declaration, name: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label="Role" required>
                      <input
                        className={inputClass}
                        value={form.declaration.role}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            declaration: { ...prev.declaration, role: e.target.value },
                          }))
                        }
                      />
                    </Field>
                    <Field label="Date">
                      <input
                        type="date"
                        className={inputClass}
                        value={form.declaration.date}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            declaration: { ...prev.declaration, date: e.target.value },
                          }))
                        }
                      />
                    </Field>
                  </div>
                  <label className="flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={form.declaration.confirmed}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          declaration: { ...prev.declaration, confirmed: e.target.checked },
                        }))
                      }
                    />
                    <span>I confirm this assessment is accurate and I am authorised to submit it.</span>
                  </label>
                </div>
              </>
            )}

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={step === 0 || submitting}
                onClick={() => {
                  setError(null);
                  setStep((prev) => Math.max(prev - 1, 0));
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {step < ASSESSMENT_STEPS.length - 1 ? (
                <Button
                  type="button"
                  className="text-white sm:ml-auto"
                  style={{ backgroundColor: "#0b3574" }}
                  onClick={goNext}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="text-white sm:ml-auto"
                  style={{ backgroundColor: "#0b3574" }}
                  disabled={submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit assessment
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            After submission we email you a confirmation and notify{" "}
            <span className="font-medium">muhammad.fahad@flowbooks.org</span> to prepare your proposal.
            Documents can follow by reply email.
          </p>
        </div>
      </section>
    </div>
  );
}
