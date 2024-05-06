import {
  __async,
  __spreadValues
} from "./chunk-XEFTB2OF.mjs";

// src/functions/auth.ts
import "server-only";
import { cookies } from "next/headers";

// src/functions/jwt.ts
import {
  importPKCS8,
  jwtVerify,
  SignJWT
} from "jose";
import { nanoid } from "nanoid";
import { Buffer } from "buffer";
var privateKey;
var getPrivateKey = () => __async(void 0, null, function* () {
  return privateKey = privateKey || (yield importPKCS8(
    Buffer.from(Auth.secret.secret, "base64").toString("utf-8"),
    Auth.secret.algorithm
  ));
});
var createToken = (data, expiration) => __async(void 0, null, function* () {
  const privateKey2 = yield getPrivateKey();
  return yield new SignJWT(__spreadValues({}, data)).setProtectedHeader({ alg: Auth.secret.algorithm }).setJti(nanoid()).setIssuedAt().setExpirationTime(expiration).sign(privateKey2);
});
var decodeToken = (sessionTokenString) => __async(void 0, null, function* () {
  try {
    const privateKey2 = yield getPrivateKey();
    return yield jwtVerify(sessionTokenString, privateKey2);
  } catch (e) {
    console.log(e);
    return false;
  }
});

// src/functions/auth.ts
function sessionsInternal() {
  return __async(this, null, function* () {
    var _a;
    const cookie = cookies();
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
  return __async(this, arguments, function* (request, {
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
  return __async(this, null, function* () {
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
import { cookies as cookies2 } from "next/headers";
function GET3() {
  return __async(this, null, function* () {
    const cookieHandler = cookies2();
    cookieHandler.delete("SessionToken");
    return new Response();
  });
}

// src/routes/message/route.ts
function GET4(request) {
  return __async(this, null, function* () {
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
  return __async(this, null, function* () {
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
import { createEdgeRouter } from "next-connect";
var handler = createEdgeRouter();
handler.get("/api/auth/callback/:id", GET);
handler.get("/api/auth/signOut", GET3);
handler.get("/api/auth/signIn", GET2);
handler.get("/api/auth/message", GET4);
handler.get("/api/auth/error", GET5);
function GET6(request, ctx) {
  return __async(this, null, function* () {
    return handler.run(request, ctx);
  });
}

// src/index.ts
var Auth = class _Auth {
  constructor(config, secret, callbacks = {
    handleAuthCheck: (session) => __async(this, null, function* () {
      return session;
    }),
    handleCreate: (account, user, session) => __async(this, null, function* () {
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
export {
  Auth,
  createToken,
  decodeToken,
  sendError,
  sendErrorRedirect,
  sendJson
};
//# sourceMappingURL=index.mjs.map