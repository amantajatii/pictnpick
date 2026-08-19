import { timingSafeEqual } from "node:crypto";
import { duitkuSignature } from "@/app/_lib/duitku.mjs";

export async function POST(request: Request) {
  const apiKey = process.env.DUITKU_SANDBOX_APIKEY;
  const expectedMerchantCode = process.env.MERCHANT_CODE_DUITKU;
  const form = await request.formData();
  const merchantCode = form.get("merchantCode")?.toString();
  const amount = form.get("amount")?.toString();
  const merchantOrderId = form.get("merchantOrderId")?.toString();
  const signature = form.get("signature")?.toString();

  if (!apiKey || !expectedMerchantCode || merchantCode !== expectedMerchantCode || !amount || !merchantOrderId || !signature) {
    return new Response("Invalid callback", { status: 400 });
  }

  const expectedSignature = duitkuSignature(merchantCode, amount, merchantOrderId, apiKey);
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return new Response("Invalid callback", { status: 400 });
  }

  return new Response("OK", { status: 200 });
}
