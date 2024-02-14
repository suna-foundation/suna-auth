import {sessionsInternal} from "./functions/auth";
import {Config, Secret} from "./types";
import {GET} from "./routes/route";
import {signOut} from "./client/callbacks/signout";
import {signIn} from "./client/callbacks/signin";
import { sendError, sendErrorRedirect, sendJson } from "./functions/responces";
import {createToken, decodeToken } from "./functions/jwt";

export class Auth {
  public static config: Config;
  public static secret: Secret;
  public static routes: any;

  constructor(config: Config, secret: any) {
    Auth.config = config;
    Auth.secret = secret;
    Auth.routes = {GET: GET };
  }
}

const auth = sessionsInternal

export {
  sendError,
  sendJson,
  sendErrorRedirect,
  decodeToken,
  createToken,
  auth
}
