"use client";
import axios from "axios";
export async function signIn(provider, config) {
    var _a;
    const { data: oauthUrlJson } = await axios.get("/api/auth/signIn", {
        params: {
            provider: provider,
        },
        headers: config,
        validateStatus: () => true,
    });
    if (typeof window == "undefined")
        throw Error("signin should be ran client side");
    // Navigate to the URL
    if (!oauthUrlJson.success) {
        return oauthUrlJson;
    }
    else if ((_a = oauthUrlJson.data) === null || _a === void 0 ? void 0 : _a.url) {
        window.location.href = oauthUrlJson.data.url;
        return false;
    }
    else {
        return oauthUrlJson;
    }
}
export async function signOut() {
    await fetch(`/api/auth/signOut`);
    if (typeof window !== "undefined") {
        window.location.reload();
    }
    else {
        throw new Error("This function can only be used on the client-side.");
    }
}
//# sourceMappingURL=index.js.map