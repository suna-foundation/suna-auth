import { Auth } from "../../../index";
import { sendErrorRedirect } from "../../../functions/responces";
export async function GET(request, { params, }) {
    const key = Object.keys(params)[0];
    if (!params[key].at(-1))
        return sendErrorRedirect(500, "this provider is not implemented");
    const authProvider = Auth.config[params[key].at(-1)];
    return authProvider.provider.handleCallback(request);
}
//# sourceMappingURL=route.js.map