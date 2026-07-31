import crypto from "crypto";

export type PaytrBasketItem = [string, string, number];

type PaytrTokenInput = {
  userIp: string;
  merchantOid: string;
  email: string;
  paymentAmount: number;
  basket: PaytrBasketItem[];
  userName: string;
  userAddress: string;
  userPhone: string;
  merchantOkUrl: string;
  merchantFailUrl: string;
};

export function getPaytrConfig() {
  const merchantId = process.env.PAYTR_MERCHANT_ID;
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

  return {
    merchantId,
    merchantKey,
    merchantSalt,
    testMode: process.env.PAYTR_TEST_MODE ?? (process.env.NODE_ENV === "production" ? "0" : "1"),
    debugOn: process.env.PAYTR_DEBUG_ON ?? "0",
  };
}

export function isPaytrConfigured() {
  const config = getPaytrConfig();
  return Boolean(config.merchantId && config.merchantKey && config.merchantSalt);
}

export function sanitizePaytrIp(ip: string | null) {
  if (!ip || ip === "::1") return "127.0.0.1";
  return ip.split(",")[0]?.trim() || "127.0.0.1";
}

function hmacBase64(value: string, key: string) {
  return crypto.createHmac("sha256", key).update(value).digest("base64");
}

export function verifyPaytrCallbackHash(input: {
  merchantOid: string;
  status: string;
  totalAmount: string;
  hash: string;
}) {
  const config = getPaytrConfig();
  if (!config.merchantKey || !config.merchantSalt) return false;

  const expected = hmacBase64(
    input.merchantOid + config.merchantSalt + input.status + input.totalAmount,
    config.merchantKey
  );

  if (expected.length !== input.hash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(input.hash));
}

export async function requestPaytrIframeToken(input: PaytrTokenInput) {
  const config = getPaytrConfig();

  if (!config.merchantId || !config.merchantKey || !config.merchantSalt) {
    throw new Error("PayTR ayarlari eksik");
  }

  const noInstallment = "0";
  const maxInstallment = "0";
  const currency = "TL";
  const userBasket = Buffer.from(JSON.stringify(input.basket)).toString("base64");
  const paytrToken = hmacBase64(
    config.merchantId +
      input.userIp +
      input.merchantOid +
      input.email +
      input.paymentAmount +
      userBasket +
      noInstallment +
      maxInstallment +
      currency +
      config.testMode +
      config.merchantSalt,
    config.merchantKey
  );

  const body = new URLSearchParams({
    merchant_id: config.merchantId,
    user_ip: input.userIp,
    merchant_oid: input.merchantOid,
    email: input.email,
    payment_amount: String(input.paymentAmount),
    paytr_token: paytrToken,
    user_basket: userBasket,
    debug_on: config.debugOn,
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: input.userName,
    user_address: input.userAddress,
    user_phone: input.userPhone,
    merchant_ok_url: input.merchantOkUrl,
    merchant_fail_url: input.merchantFailUrl,
    timeout_limit: "30",
    currency,
    test_mode: config.testMode,
    lang: "tr",
  });

  const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await response.json()) as { status?: string; token?: string; reason?: string };

  if (!response.ok || data.status !== "success" || !data.token) {
    throw new Error(data.reason || "PayTR token alinamadi");
  }

  return data.token;
}
