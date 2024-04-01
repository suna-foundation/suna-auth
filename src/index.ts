import { sessionsInternal } from "./functions/auth";
import {
  AccountType,
  Config,
  Secret,
  Session,
  SessionType,
  UserType,
} from "./types";
import { GET } from "./routes/route";
import { sendError, sendErrorRedirect, sendJson } from "./functions/responces";
import { createToken, decodeToken } from "./functions/jwt";
import {NextRequest} from "npm:next/server";
import {RequestContext} from "npm:next/dist/server/base-server";

export class Auth {
  public static config: Config;
  public static secret: Secret;
  public auth: () => Promise<false | Session>;
  public routes: {
    GET(request: NextRequest, ctx: RequestContext): Promise<void | Response>
  };
  public static callbacks: {
    handleAuthCheck(session: Session): Promise<Session>;
    handleCreate(
      account: AccountType,
      user: UserType,
      session: SessionType,
    ): Promise<any>;
  };

  constructor(
    config: Config,
    secret: any,
    callbacks: typeof Auth.callbacks = {
      handleAuthCheck: async (session: Session) => session,
      handleCreate: async (
        account: AccountType,
        user: UserType,
        session: SessionType,
      ) => undefined,
    },
  ) {
    Auth.config = config;
    Auth.secret = secret;
    Auth.callbacks = callbacks;

    this.routes = { GET: GET };
    this.auth = sessionsInternal;
  }
}

export { sendError, sendJson, sendErrorRedirect, decodeToken, createToken };
