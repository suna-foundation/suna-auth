"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }"use client";



var _chunk6WM3INZTjs = require('../chunk-6WM3INZT.js');

// src/client/index.ts
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
function signIn(provider, config) {
  return _chunk6WM3INZTjs.__async.call(void 0, this, null, function* () {
    var _a;
    const { data: oauthUrlJson } = yield _axios2.default.get("/api/auth/signIn", {
      params: {
        provider
      },
      headers: _chunk6WM3INZTjs.__spreadValues.call(void 0, {}, config),
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
  return _chunk6WM3INZTjs.__async.call(void 0, this, null, function* () {
    yield fetch(`/api/auth/signOut`);
    if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      throw new Error("This function can only be used on the client-side.");
    }
  });
}



exports.signIn = signIn; exports.signOut = signOut;
//# sourceMappingURL=index.js.map