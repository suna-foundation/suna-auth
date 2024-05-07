"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const route_1 = require("./callback/[id]/route");
const route_2 = require("./signIn/route");
const route_3 = require("./signOut/route");
const route_4 = require("./message/route");
const route_5 = require("./error/route");
const next_connect_1 = require("next-connect");
const handler = (0, next_connect_1.createEdgeRouter)();
// Define your routes
handler.get("/api/auth/callback/:id", route_1.GET);
handler.get("/api/auth/signOut", route_3.GET);
handler.get("/api/auth/signIn", route_2.GET);
handler.get("/api/auth/message", route_4.GET);
handler.get("/api/auth/error", route_5.GET);
async function GET(request, ctx) {
    return handler.run(request, ctx);
}
exports.GET = GET;
//# sourceMappingURL=route.js.map