import { createHmac } from "node:crypto";

export const duitkuSignature = (...parts) => {
  const apiKey = parts.pop();
  return createHmac("sha256", apiKey).update(parts.join("")).digest("hex");
};

export const openDuitkuPopup = (checkout, reference, events) =>
  checkout.process(reference, { defaultLanguage: "id", ...events });
