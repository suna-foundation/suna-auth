export async function GET(request) {
    const cookieHandler = request.cookies;
    cookieHandler.delete("SessionToken");
    return new Response();
}
//# sourceMappingURL=route.js.map