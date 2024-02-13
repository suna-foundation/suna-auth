import * as crypto from "crypto";

export function generateSHA256() {
  const randomBytes = crypto.randomBytes(32);
  const hash = crypto.createHash("sha256").update(randomBytes).digest("hex");

  return hash;
}
