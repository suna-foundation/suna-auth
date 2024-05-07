"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const message = searchParams.get("message");
    const code = searchParams.get("code");
    return new Response(`<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background-color: black;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Message: </h1>
    <p id="message">${message}</p>

    <h1>Code: </h1>
    <p id="code">${code}</p>
</body>
</html>`, {
        headers: { "Content-Type": "text/html" },
    });
}
exports.GET = GET;
//# sourceMappingURL=route.js.map