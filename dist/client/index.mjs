"use client";
import {
  __async,
  __spreadValues
} from "../chunk-XEFTB2OF.mjs";

// src/client/index.ts
import axios from "axios";
function signIn(provider, config) {
  return __async(this, null, function* () {
    var _a;
    const { data: oauthUrlJson } = yield axios.get("/api/auth/signIn", {
      params: {
        provider
      },
      headers: __spreadValues({}, config),
      validateStatus: () => true
    });
    if (typeof window == "undefined")
      throw Error("signin should be ran client side");
    if (!oauthUrlJson.success) {
      return oauthUrlJson;
    } else if ((_a = oauthUrlJson.data) == null ? void 0 : _a.url) {
      window.location.href = oauthUrlJson.data.url;
      return false;
    } else {
      return oauthUrlJson;
    }
  });
}
function signOut() {
  return __async(this, null, function* () {
    yield fetch(`/api/auth/signOut`);
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      throw new Error("This function can only be used on the client-side.");
    }
  });
}
export {
  signIn,
  signOut
};
//# sourceMappingURL=index.mjs.map