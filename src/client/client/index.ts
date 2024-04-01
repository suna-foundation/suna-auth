"use client";

import { Auth } from "../index";
import { ErrorResult, JsonResult, SignInConfig } from "../types";
import axios from "axios";

export async function signIn(
  provider: keyof typeof Auth.config,
  config?: SignInConfig,
) {
  const { data: oauthUrlJson } = await axios.get<
    JsonResult<{ url: string }> | ErrorResult
  >("/api/auth/signIn", {
    params: {
      provider: provider,
    },
    headers: {
      ...config,
    },
    validateStatus: () => true,
  });

  if (typeof window == "undefined")
    throw Error("signin should be ran client side");

  // Navigate to the URL
  if (!oauthUrlJson.success) {
    return oauthUrlJson;
  } else if (oauthUrlJson.data?.url) {
    window.location.href = oauthUrlJson.data.url;
    return false;
  } else {
    return oauthUrlJson;
  }
}

export async function signOut() {
  await fetch(`/api/auth/signOut`);

  if (typeof window !== "undefined") {
    window.location.reload();
  } else {
    throw new Error("This function can only be used on the client-side.");
  }
}
