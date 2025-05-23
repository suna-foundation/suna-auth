import "server-only";
import { Auth } from "../index";
import { decodeToken } from "./jwt";
export async function sessionsInternal(request) {
    var _a;
    const cookie = request.cookies;
    const sessionTokenString = (_a = cookie.get("SessionToken")) === null || _a === void 0 ? void 0 : _a.value;
    if (!sessionTokenString)
        return false;
    try {
        const decodedPayload = await decodeToken(sessionTokenString);
        if (!decodedPayload ||
            !decodedPayload.payload ||
            !decodedPayload.payload.provider)
            return false;
        const currentProvider = Auth.config[decodedPayload.payload.provider];
        /*let cacheAccount: IAccounts | undefined = undefined
        if (currentProvider.cache) {
          const cachedAccountString = await currentProvider.cache.getValue(Session)
          if (cachedAccountString) cacheAccount = JSON.parse(cachedAccountString)
        }*/
        const userSession = await currentProvider.provider.handleAuthCheck(request, sessionTokenString);
        if (!userSession)
            return false;
        return await Auth.callbacks.handleAuthCheck(userSession);
    }
    catch (e) {
        console.log("Error while fetching session token", e);
        return false;
    }
}
//# sourceMappingURL=auth.js.map