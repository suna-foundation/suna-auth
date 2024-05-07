"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const index_1 = require("../../../index");
const responces_1 = require("../../../functions/responces");
async function GET(request, { params, }) {
    const key = Object.keys(params)[0];
    if (!params[key].at(-1))
        return (0, responces_1.sendErrorRedirect)(500, "this provider is not implemented");
    const authProvider = index_1.Auth.config[params[key].at(-1)];
    return authProvider.provider.handleCallback(request);
}
exports.GET = GET;
//# sourceMappingURL=route.js.map