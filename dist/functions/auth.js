"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionsInternal = void 0;
require("server-only");
const headers_1 = require("next/headers");
const index_1 = require("../index");
const jwt_1 = require("./jwt");
async function sessionsInternal() {
    var _a;
    const cookie = (0, headers_1.cookies)();
    const sessionTokenString = (_a = cookie.get("SessionToken")) === null || _a === void 0 ? void 0 : _a.value;
    if (!sessionTokenString)
        return false;
    try {
        const decodedPayload = await (0, jwt_1.decodeToken)(sessionTokenString);
        if (!decodedPayload ||
            !decodedPayload.payload ||
            !decodedPayload.payload.provider)
            return false;
        const currentProvider = index_1.Auth.config[decodedPayload.payload.provider];
        /*let cacheAccount: IAccounts | undefined = undefined
        if (currentProvider.cache) {
          const cachedAccountString = await currentProvider.cache.getValue(Session)
          if (cachedAccountString) cacheAccount = JSON.parse(cachedAccountString)
        }*/
        const userSession = await currentProvider.provider.handleAuthCheck(sessionTokenString);
        if (!userSession)
            return false;
        return await index_1.Auth.callbacks.handleAuthCheck(userSession);
    }
    catch (e) {
        console.log("Error while fetching session token", e);
        return false;
    }
}
exports.sessionsInternal = sessionsInternal;
//# sourceMappingURL=auth.js.map