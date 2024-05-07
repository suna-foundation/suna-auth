"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = void 0;
const axios_1 = __importDefault(require("axios"));
async function signIn(provider, config) {
    var _a;
    const { data: oauthUrlJson } = await axios_1.default.get("/api/auth/signIn", {
        params: {
            provider: provider,
        },
        headers: Object.assign({}, config),
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
exports.signIn = signIn;
async function signOut() {
    await fetch(`/api/auth/signOut`);
    if (typeof window !== "undefined") {
        window.location.reload();
    }
    else {
        throw new Error("This function can only be used on the client-side.");
    }
}
exports.signOut = signOut;
//# sourceMappingURL=index.js.map