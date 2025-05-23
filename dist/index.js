import { sessionsInternal } from "./functions/auth";
import * as routes from "./routes/route";
import { sendError, sendErrorRedirect, sendJson } from "./functions/responces";
import { createToken, decodeToken } from "./functions/jwt";
export class Auth {
    constructor(config, secret, callbacks = {
        handleAuthCheck: async (session) => session,
        handleCreate: async (account, user, session) => undefined,
    }) {
        Auth.config = config;
        Auth.secret = secret;
        Auth.callbacks = callbacks;
        this.routes = routes;
        this.auth = sessionsInternal;
    }
}
export { sendError, sendJson, sendErrorRedirect, decodeToken, createToken };
//# sourceMappingURL=index.js.map