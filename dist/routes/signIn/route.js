"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const responces_1 = require("../../functions/responces");
const index_1 = require("../../index");
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const provider = searchParams.get("provider");
    const referer = request.headers.get("redirect_url") ||
        request.headers.get("referer") ||
        "/";
    if (!provider)
        return (0, responces_1.sendError)(400, "please provide a ?provider");
    const providerData = index_1.Auth.config[provider];
    if (!providerData)
        return (0, responces_1.sendError)(400, `Provider ${provider} is not supported.`);
    return providerData.provider.handleSignIn(request, referer);
}
exports.GET = GET;
//# sourceMappingURL=route.js.map