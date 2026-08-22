import { NextResponse } from "next/server";
import { duitkuSignature } from "@/app/_lib/duitku.mjs";
import { getVoucher } from "@/app/_lib/vouchers.mjs";

const duitkuUrl = "https://api-sandbox.duitku.com/api/merchant/createInvoice";

export async function POST(request: Request) {
  const merchantCode = process.env.MERCHANT_CODE_DUITKU;
  const apiKey = process.env.DUITKU_SANDBOX_APIKEY;
  if (!merchantCode || !apiKey) {
    return NextResponse.json({ error: "Konfigurasi Duitku Sandbox belum lengkap." }, { status: 500 });
  }

  const { voucherId, name, email } = await request.json();
  const voucher = getVoucher(voucherId);
  if (!voucher || typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Pilih voucher dan isi nama serta email yang valid." }, { status: 400 });
  }

  const timestamp = Date.now().toString();
  const orderId = `PNP-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const origin = new URL(request.url).origin;
  const customerName = name.trim().slice(0, 20);
  const payload = {
    paymentAmount: voucher.price,
    merchantOrderId: orderId,
    productDetails: voucher.name,
    additionalParam: "",
    merchantUserInfo: email.trim(),
    paymentMethod: "",
    customerVaName: customerName,
    email: email.trim(),
    phoneNumber: "",
    itemDetails: [{ name: voucher.name, price: voucher.price, quantity: 1 }],
    callbackUrl: `${origin}/api/duitku/callback`,
    returnUrl: `${origin}/payment-demo/status`,
    expiryPeriod: 10,
  };

  const response = await fetch(duitkuUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-duitku-timestamp": timestamp,
      "x-duitku-signature": duitkuSignature(merchantCode, timestamp, apiKey),
      "x-duitku-merchantcode": merchantCode,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  const result = await response.json().catch(() => null);

  if (!response.ok || !result?.reference) {
    return NextResponse.json(
      { error: result?.Message ?? result?.message ?? "Duitku Sandbox belum dapat membuat pembayaran." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reference: result.reference });
}
