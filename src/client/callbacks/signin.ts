"use client";
import axios from "axios";
import {Auth} from "../../index";
import {ErrorResult, JsonResult, SignInConfig, SignInWithProviderResult} from "../../types";

export async function signIn(provider: keyof typeof Auth.config, config?: SignInConfig): SignInWithProviderResult {
  const { data: oauthUrlJson } = await axios.get<JsonResult<{url: string}> | ErrorResult>('/api/auth/signIn', {
    params: {
      provider: provider,
    },
    headers: {
      ...config
    },
    validateStatus: () => true
  });

  if (typeof window == "undefined") throw Error("signin should be ran client side")

  // Navigate to the URL
  if (!oauthUrlJson.success) {
    return oauthUrlJson
  } else if (oauthUrlJson.data?.url) {
    window.location.href = oauthUrlJson.data.url;
    return false
  } else {
    return oauthUrlJson
  }
}