"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const headers_1 = require("next/headers");
async function GET() {
    const cookieHandler = (0, headers_1.cookies)();
    cookieHandler.delete("SessionToken");
    return new Response();
}
exports.GET = GET;
//# sourceMappingURL=route.js.map