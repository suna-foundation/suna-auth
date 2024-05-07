"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.decodeToken = exports.sendErrorRedirect = exports.sendJson = exports.sendError = exports.Auth = void 0;
const auth_1 = require("./functions/auth");
const route_1 = require("./routes/route");
const responces_1 = require("./functions/responces");
Object.defineProperty(exports, "sendError", { enumerable: true, get: function () { return responces_1.sendError; } });
Object.defineProperty(exports, "sendErrorRedirect", { enumerable: true, get: function () { return responces_1.sendErrorRedirect; } });
Object.defineProperty(exports, "sendJson", { enumerable: true, get: function () { return responces_1.sendJson; } });
const jwt_1 = require("./functions/jwt");
Object.defineProperty(exports, "createToken", { enumerable: true, get: function () { return jwt_1.createToken; } });
Object.defineProperty(exports, "decodeToken", { enumerable: true, get: function () { return jwt_1.decodeToken; } });
class Auth {
    constructor(config, secret, callbacks = {
        handleAuthCheck: async (session) => session,
        handleCreate: async (account, user, session) => undefined,
    }) {
        Auth.config = config;
        Auth.secret = secret;
        Auth.callbacks = callbacks;
        this.routes = { GET: route_1.GET };
        this.auth = auth_1.sessionsInternal;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=index.js.map