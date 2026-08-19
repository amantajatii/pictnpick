import assert from "node:assert/strict";
import test from "node:test";
import { getVoucher, vouchers } from "../app/_lib/vouchers.mjs";

test("lists the two redeemable Pict n Pick vouchers with their IDR prices", () => {
  assert.deepEqual(vouchers, [
    {
      id: "photoreceipt",
      name: "Voucher Photoreceipt",
      price: 10000,
      description: "1 sesi cetak foto berbentuk receipt",
    },
    {
      id: "photobox",
      name: "Voucher Photobox",
      price: 30000,
      description: "1 sesi foto dan cetak Photobox",
    },
  ]);
});

test("only returns a voucher for a known checkout choice", () => {
  assert.equal(getVoucher("photobox")?.price, 30000);
  assert.equal(getVoucher("anything-else"), undefined);
});
