export type ComplianceAssessmentPayload = {
  organisation: Record<string, string>;
  contact: Record<string, string>;
  dataVolume: Record<string, string>;
  systems: Record<string, string>;
  registrationStatus: string;
  existingControls: string[];
  requestedServices: string[];
  requestedOther: string;
  budget: Record<string, string>;
  declaration: Record<string, string>;
};

function backendBaseUrl() {
  const fromEnv = import.meta.env.VITE_BACKEND_URL as string | undefined;
  return (fromEnv && fromEnv.trim()) || "http://localhost:4000";
}

export async function submitComplianceAssessment(payload: ComplianceAssessmentPayload) {
  const resp = await fetch(`${backendBaseUrl()}/api/assessments/compliance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok || !data?.ok) {
    throw new Error(data?.message || "Failed to submit assessment.");
  }

  return data as { ok: true; notified: string; clientEmail: string };
}
