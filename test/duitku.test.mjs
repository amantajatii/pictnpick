import assert from "node:assert/strict";
import test from "node:test";
import { duitkuSignature } from "../app/_lib/duitku.mjs";

test("signs Duitku callback fields with HMAC SHA-256", () => {
  assert.equal(
    duitkuSignature("D123", "10000", "order-1", "secret"),
    "879e546e9667861bcf9e50320aecb1bc2a5beebd766d298addfd92e1e2a55a20",
  );
});
