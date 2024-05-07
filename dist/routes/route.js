import { GET as callback } from "./callback/[id]/route";
import { GET as signIn } from "./signIn/route";
import { GET as signOut } from "./signOut/route";
import { GET as message } from "./message/route";
import { GET as error } from "./error/route";
import { createEdgeRouter } from "next-connect";
const handler = createEdgeRouter();
// Define your routes
handler.get("/api/auth/callback/:id", callback);
handler.get("/api/auth/signOut", signOut);
handler.get("/api/auth/signIn", signIn);
handler.get("/api/auth/message", message);
handler.get("/api/auth/error", error);
export async function GET(request, ctx) {
    return handler.run(request, ctx);
}
//# sourceMappingURL=route.js.map