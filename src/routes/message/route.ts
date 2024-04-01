export async function GET(request: { nextUrl: { searchParams: any } }) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get("message");
  const code = searchParams.get("code");

  return new Response(
    `<!DOCTYPE html>
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
</html>`,
    {
      headers: { "Content-Type": "text/html" },
    },
  );
}
