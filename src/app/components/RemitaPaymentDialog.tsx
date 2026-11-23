import { useState } from "react";
import { Check, Copy, CreditCard, Loader2, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  initiateRemitaPayment,
  verifyRemitaPayment,
  type RemitaInitiateResult,
  type RemitaProduct,
} from "@/app/lib/remitaApi";

type RemitaPaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  product: RemitaProduct;
  planName: string;
  amount: number;
  amountLabel: string;
};

export function RemitaPaymentDialog({
  open,
  onClose,
  product,
  planName,
  amount,
  amountLabel,
}: RemitaPaymentDialogProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RemitaInitiateResult | null>(null);
  const [verifyResult, setVerifyResult] = useState<unknown>(null);
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const productLabel =
    product === "connect_app"
      ? "Flowbooks Connect (NRS e-invoicing)"
      : "Flowbooks subscription (ERP / Accounting)";

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-[#0b3574] focus:ring-2 focus:ring-[#0b3574]/15";

  const handleGenerateRrr = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    if (!amount || amount <= 0) {
      setError("This plan cannot be paid online yet. Contact sales for a custom quote.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setVerifyResult(null);

    try {
      const data = await initiateRemitaPayment({
        amount,
        email: email.trim(),
        firstName: firstName.trim() || "Customer",
        lastName: lastName.trim(),
        phone: phone.trim(),
        planName,
        product,
        channel: "rrr",
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate Remita RRR.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.rrr) return;
    await navigator.clipboard.writeText(result.rrr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleVerify = async () => {
    if (!result?.rrr) return;
    setVerifying(true);
    setError(null);
    try {
      const data = await verifyRemitaPayment(result.rrr);
      setVerifyResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify payment.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close payment dialog"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[#4166b2] font-semibold">
              Remita payment
            </div>
            <h3 className="text-lg font-semibold text-foreground">{productLabel}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="rounded-xl bg-[#0b3574]/5 border border-[#0b3574]/15 px-4 py-3">
            <div className="text-sm text-muted-foreground">Plan</div>
            <div className="font-semibold text-foreground">{planName}</div>
            <div className="text-2xl font-bold text-[#0b3574] mt-1">{amountLabel}</div>
          </div>

          {!result ? (
            <>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="block space-y-1.5 sm:col-span-2">
                  <span className="text-sm font-medium">Email *</span>
                  <input
                    className={inputClass}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">First name</span>
                  <input
                    className={inputClass}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-medium">Last name</span>
                  <input
                    className={inputClass}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="block space-y-1.5 sm:col-span-2">
                  <span className="text-sm font-medium">Phone</span>
                  <input
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="080…"
                  />
                </label>
              </div>

              <p className="text-xs text-muted-foreground">
                We will generate a Remita Retrieval Reference (RRR) you can use to pay at any
                supporting Nigerian bank, or via Remita channels.
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-border p-4 text-center">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                  Your Remita RRR
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-wider text-foreground">
                  {result.rrr}
                </div>
                <div className="mt-3 flex justify-center gap-2">
                  <Button type="button" variant="outline" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? "Copied" : "Copy RRR"}
                  </Button>
                  <Button
                    type="button"
                    className="text-white"
                    style={{ backgroundColor: "#0b3574" }}
                    disabled={verifying}
                    onClick={handleVerify}
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      "Verify payment"
                    )}
                  </Button>
                </div>
              </div>

              {result.bankPaymentInstructions?.length ? (
                <div className="rounded-xl bg-muted/50 p-4">
                  <div className="text-sm font-semibold mb-2">How to pay in the bank</div>
                  <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                    {result.bankPaymentInstructions.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              <div className="text-xs text-muted-foreground">
                Order ID: <span className="font-medium text-foreground">{result.orderId}</span> · Amount:{" "}
                <span className="font-medium text-foreground">
                  ₦{Number(result.amount).toLocaleString()}
                </span>
              </div>

              {verifyResult ? (
                <pre className="overflow-auto rounded-xl bg-muted p-3 text-xs text-foreground max-h-40">
                  {JSON.stringify(verifyResult, null, 2)}
                </pre>
              ) : null}
            </div>
          )}

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row gap-3">
          <Button type="button" variant="outline" className="sm:mr-auto" onClick={onClose}>
            Close
          </Button>
          {!result ? (
            <Button
              type="button"
              className="text-white"
              style={{ backgroundColor: "#0b3574" }}
              disabled={submitting}
              onClick={handleGenerateRrr}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating RRR…
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Generate Remita RRR
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setResult(null);
                setVerifyResult(null);
                setError(null);
              }}
            >
              Generate another
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
