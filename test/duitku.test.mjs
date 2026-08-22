import assert from "node:assert/strict";
import test from "node:test";
import * as duitku from "../app/_lib/duitku.mjs";

test("signs Duitku callback fields with HMAC SHA-256", () => {
  assert.equal(
    duitku.duitkuSignature("D123", "10000", "order-1", "secret"),
    "879e546e9667861bcf9e50320aecb1bc2a5beebd766d298addfd92e1e2a55a20",
  );
});

test("opens Duitku POP with the invoice reference", () => {
  let received;
  const checkout = { process: (...args) => { received = args; } };
  const events = { closeEvent() {} };

  duitku.openDuitkuPopup?.(checkout, "D123REF", events);

  assert.deepEqual(received, ["D123REF", { defaultLanguage: "id", ...events }]);
});
