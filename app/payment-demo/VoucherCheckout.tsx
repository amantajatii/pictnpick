"use client";

import { useState } from "react";
import { Check, Ticket } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { openDuitkuPopup } from "../_lib/duitku.mjs";
import { vouchers } from "../_lib/vouchers.mjs";

type DuitkuResult = { resultCode: string };
type DuitkuCheckout = {
  process: (reference: string, options: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    checkout?: DuitkuCheckout;
  }
}

const formatRupiah = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function VoucherCheckout() {
  const [selectedId, setSelectedId] = useState(vouchers[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isDuitkuReady, setIsDuitkuReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedVoucher = vouchers.find((voucher) => voucher.id === selectedId)!;

  async function handleCheckout() {
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/duitku/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voucherId: selectedId, name, email }),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) throw new Error(result.error);
      if (!window.checkout) throw new Error("Duitku belum siap. Silakan coba lagi.");

      const showStatus = ({ resultCode }: DuitkuResult) =>
        window.location.assign(`/payment-demo/status?resultCode=${resultCode}`);
      openDuitkuPopup(window.checkout, result.reference, {
        successEvent: showStatus,
        pendingEvent: showStatus,
        errorEvent: () => {
          setError("Pembayaran gagal diproses.");
          setIsSubmitting(false);
        },
        closeEvent: () => setIsSubmitting(false),
      });
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout belum dapat dimulai.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-ink sm:py-20">
      <Script
        src="https://app-sandbox.duitku.com/lib/js/duitku.js"
        onReady={() => setIsDuitkuReady(true)}
        onError={() => setError("Duitku gagal dimuat. Muat ulang halaman ini.")}
      />
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold text-orange-600 hover:underline">
          ← Kembali ke Pict n Pick
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(31,26,23,0.08)] sm:p-10">
          <span className="inline-block rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-600">
            Voucher Pict n Pick
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Pilih voucher pengalamanmu
          </h1>
          <p className="mt-4 text-ink/70">
            Voucher dapat ditukarkan untuk satu sesi di unit Pict n Pick yang tersedia.
          </p>

          <div className="mt-8 space-y-3" role="radiogroup" aria-label="Pilihan voucher">
            {vouchers.map((voucher) => {
              const selected = voucher.id === selectedId;
              return (
                <button
                  key={voucher.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSelectedId(voucher.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${selected ? "border-orange-600 bg-peach/40 ring-2 ring-orange-600/20" : "border-ink/10 hover:border-orange/50"}`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="flex items-center gap-2 font-bold">
                        <Ticket className="h-5 w-5 text-orange-600" />
                        {voucher.name}
                      </span>
                      <span className="mt-1 block text-sm text-ink/65">{voucher.description}</span>
                    </span>
                    {selected && <Check className="h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />}
                  </span>
                  <span className="mt-4 block text-xl font-bold text-ink">{formatRupiah(voucher.price)}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-cream p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-ink/65">Total pembayaran</span>
              <strong className="text-2xl">{formatRupiah(selectedVoucher.price)}</strong>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-orange"
              placeholder="Nama lengkap"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-orange"
              placeholder="Email"
            />
          </div>
          <button type="button" onClick={handleCheckout} disabled={isSubmitting || !isDuitkuReady} className="mt-4 w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange disabled:cursor-wait disabled:opacity-60">
            {!isDuitkuReady ? "Menyiapkan Duitku..." : isSubmitting ? "Membuka Duitku..." : "Bayar dengan Duitku Sandbox"}
          </button>
          {error && <p role="alert" className="mt-3 text-center text-sm text-red-600">{error}</p>}
          <p className="mt-4 text-center text-xs leading-relaxed text-ink/55">
            Pembayaran menggunakan Duitku Sandbox. Kamu akan diarahkan ke halaman pembayaran Duitku.
          </p>
        </div>
      </div>
    </main>
  );
}
