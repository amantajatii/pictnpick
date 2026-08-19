import type { Metadata } from "next";
import VoucherCheckout from "./VoucherCheckout";

export const metadata: Metadata = {
  title: "Voucher Pict n Pick",
  description: "Pilih voucher Photoreceipt atau Photobox Pict n Pick.",
};

export default function PaymentDemoPage() {
  return <VoucherCheckout />;
}
