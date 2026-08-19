import Link from "next/link";

export default async function PaymentStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ resultCode?: string }>;
}) {
  const { resultCode } = await searchParams;
  const message = resultCode === "00"
    ? "Pembayaran berhasil. Voucher akan diproses oleh Pict n Pick."
    : resultCode === "01"
      ? "Pembayaran masih menunggu penyelesaian."
      : "Pembayaran belum selesai atau dibatalkan.";

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4 text-center text-ink">
      <div className="max-w-lg rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgba(31,26,23,0.08)]">
        <h1 className="text-3xl font-bold">Status pembayaran</h1>
        <p className="mt-4 text-ink/70">{message}</p>
        <Link href="/payment-demo" className="mt-7 inline-block rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange">
          Kembali ke voucher
        </Link>
      </div>
    </main>
  );
}
