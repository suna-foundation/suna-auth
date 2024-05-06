"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkD3E2KNWRcjs = require('./chunk-D3E2KNWR.cjs');

// src/functions/auth.ts
require('server-only');
var _headers = require('next/headers');

// src/functions/jwt.ts




var _jose = require('jose');
var _nanoid = require('nanoid');
var _buffer = require('buffer');
var privateKey;
var getPrivateKey = () => _chunkD3E2KNWRcjs.__async.call(void 0, void 0, null, function* () {
  return privateKey = privateKey || (yield _jose.importPKCS8.call(void 0, 
    _buffer.Buffer.from(Auth.secret.secret, "base64").toString("utf-8"),
    Auth.secret.algorithm
  ));
});
var createToken = (data, expiration) => _chunkD3E2KNWRcjs.__async.call(void 0, void 0, null, function* () {
  const privateKey2 = yield getPrivateKey();
  return yield new (0, _jose.SignJWT)(_chunkD3E2KNWRcjs.__spreadValues.call(void 0, {}, data)).setProtectedHeader({ alg: Auth.secret.algorithm }).setJti(_nanoid.nanoid.call(void 0, )).setIssuedAt().setExpirationTime(expiration).sign(privateKey2);
});
var decodeToken = (sessionTokenString) => _chunkD3E2KNWRcjs.__async.call(void 0, void 0, null, function* () {
  try {
    const privateKey2 = yield getPrivateKey();
    return yield _jose.jwtVerify.call(void 0, sessionTokenString, privateKey2);
  } catch (e) {
    console.log(e);
    return false;
  }
});

// src/functions/auth.ts
function sessionsInternal() {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
    var _a;
    const cookie = _headers.cookies.call(void 0, );
    const sessionTokenString = (_a = cookie.get("SessionToken")) == null ? void 0 : _a.value;
    if (!sessionTokenString)
      return false;
    try {
      const decodedPayload = yield decodeToken(sessionTokenString);
      if (!decodedPayload || !decodedPayload.payload || !decodedPayload.payload.provider)
        return false;
      const currentProvider = Auth.config[decodedPayload.payload.provider];
      const userSession = yield currentProvider.provider.handleAuthCheck(sessionTokenString);
      if (!userSession)
        return false;
      return yield Auth.callbacks.handleAuthCheck(userSession);
    } catch (e) {
      console.log("Error while fetching session token", e);
      return false;
    }
  });
}

// src/functions/responces.ts
var sendError = (status, message) => {
  return Response.json(
    {
      success: false,
      status,
      message
    },
    {
      status,
      statusText: message
    }
  );
};
var sendJson = (data, code) => {
  return Response.json(
    {
      success: true,
      data
    },
    {
      status: code
    }
  );
};
var sendErrorRedirect = (status, message) => {
  return Response.redirect(
    `${process.env.NEXTAUTH_URL}/api/auth/error?message=${message}&code=${status}`,
    302
  );
};

// src/routes/callback/[id]/route.ts
function GET(_0, _1) {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, arguments, function* (request, {
    params
  }) {
    const key = Object.keys(params)[0];
    if (!params[key].at(-1))
      return sendErrorRedirect(500, "this provider is not implemented");
    const authProvider = Auth.config[params[key].at(-1)];
    return authProvider.provider.handleCallback(request);
  });
}

// src/routes/signIn/route.ts
function GET2(request) {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
    const searchParams = request.nextUrl.searchParams;
    const provider = searchParams.get("provider");
    const referer = request.headers.get("redirect_url") || request.headers.get("referer") || "/";
    if (!provider)
      return sendError(400, "please provide a ?provider");
    const providerData = Auth.config[provider];
    if (!providerData)
      return sendError(400, `Provider ${provider} is not supported.`);
    return providerData.provider.handleSignIn(request, referer);
  });
}

// src/routes/signOut/route.ts

function GET3() {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
    const cookieHandler = _headers.cookies.call(void 0, );
    cookieHandler.delete("SessionToken");
    return new Response();
  });
}

// src/routes/message/route.ts
function GET4(request) {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
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
        headers: { "Content-Type": "text/html" }
      }
    );
  });
}

// src/routes/error/route.ts
function GET5(request) {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
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
        headers: { "Content-Type": "text/html" }
      }
    );
  });
}

// src/routes/route.ts
var _nextconnect = require('next-connect');
var handler = _nextconnect.createEdgeRouter.call(void 0, );
handler.get("/api/auth/callback/:id", GET);
handler.get("/api/auth/signOut", GET3);
handler.get("/api/auth/signIn", GET2);
handler.get("/api/auth/message", GET4);
handler.get("/api/auth/error", GET5);
function GET6(request, ctx) {
  return _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
    return handler.run(request, ctx);
  });
}

// src/index.ts
var Auth = class _Auth {
  constructor(config, secret, callbacks = {
    handleAuthCheck: (session) => _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
      return session;
    }),
    handleCreate: (account, user, session) => _chunkD3E2KNWRcjs.__async.call(void 0, this, null, function* () {
      return void 0;
    })
  }) {
    _Auth.config = config;
    _Auth.secret = secret;
    _Auth.callbacks = callbacks;
    this.routes = { GET: GET6 };
    this.auth = sessionsInternal;
  }
};







exports.Auth = Auth; exports.createToken = createToken; exports.decodeToken = decodeToken; exports.sendError = sendError; exports.sendErrorRedirect = sendErrorRedirect; exports.sendJson = sendJson;
