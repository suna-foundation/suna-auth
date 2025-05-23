export async function GET(request) {
    const searchQuery = request.query;
    const message = searchQuery.get("message");
    const code = searchQuery.get("code");
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
//# sourceMappingURL=route.js.map